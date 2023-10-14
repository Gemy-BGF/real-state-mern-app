import bcrypt from "bcryptjs";
import User from "../models/user_model.js";
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
