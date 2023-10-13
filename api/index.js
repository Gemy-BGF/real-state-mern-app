import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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
app.use(express.json()); // allow use to respond with a json response
app.listen(3000, () => {
	console.log("Express Server on 3000 !!!🎉");
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
