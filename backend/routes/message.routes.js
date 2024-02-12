import express from "express";
import { getMessage, messageSend } from "../controller/message.controller.js";
import protectRoutes from "../middleware/protectRoutes.js";

const messageRoutes = express.Router();

messageRoutes.post("/send/:id",protectRoutes,messageSend);
messageRoutes.get("/:id",protectRoutes,getMessage);   

export default messageRoutes;