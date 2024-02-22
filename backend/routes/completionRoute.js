import express from "express";
import { sendChat } from "../controllers/chatCompletionController.js";

const router = express.Router()

router.route("/chatCompletions").post(sendChat)

export default router;