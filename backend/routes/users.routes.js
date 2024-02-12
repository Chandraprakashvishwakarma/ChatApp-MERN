import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import getUsers from "../controller/users.controller.js";

const userRouter = express.Router();

userRouter.get("/",protectRoutes,getUsers)

export default userRouter;