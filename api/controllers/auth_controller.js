import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user_model.js";
import { errorHandler } from "./../utils/error.js";
export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;
	if (!email || !password || !username) return;
	const hashedPassword = bcrypt.hashSync(password, 10);
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});
	try {
		await newUser.save();
		res.status(201).json("user created succesfully !!!");
	} catch (error) {
		next(error);
	}
};
export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, "User not found"));
		}
		const validPassword = await bcrypt.compare(password, validUser.password);
		if (validPassword === false)
			return next(errorHandler(401, "Wrong Credentials"));
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
		const { password: pass, ...rest } = validUser._doc;
		res
			.cookie("access_token", token, {
				httpOnly: true,
				expires: new Date(Date.now() + 21 * 24 * 60 * 60),
			})
			.status(200)
			.json(rest);
	} catch (error) {
		next(error);
	}
};
