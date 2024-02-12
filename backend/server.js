import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRouter from "./routes/users.routes.js";

import connectMongoDb from "./db/connectMongo.js";


const app = express();
dotenv.config();

const port = process.env.PORT || 3000 ;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRouter);


app.listen(port,()=>{
    connectMongoDb();
    console.log("Server started on port: ",port);
});