import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes//user_route.js";
dotenv.config();
mongoose
	.connect(process.env.MONGO_STRING)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => {
		console.log(err);
	});
const app = express();
app.listen(3000, () => {
	console.log("Express Server on 3000 !!!🎉");
});

app.use("/api/user", userRouter);
