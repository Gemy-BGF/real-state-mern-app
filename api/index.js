import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user_route.js";
import authRouter from "./routes/auth_route.js";
dotenv.config();
mongoose
	.connect(process.env.MONGO_STRING)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => {
		console.log(err);
	});
const app = express();
app.use(cors());
app.use(express.json()); // allow use to respond with a json response
app.listen(3000, () => {
	console.log("Express Server on 3000 !!!🎉");
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// error handler middleware
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});
