import express from "express";
import messageController from "../controller/message.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/send",authMiddleware,messageController.sendMessage);
router.get("/:senderId/:receiverId",authMiddleware,messageController.getMessages);
router.patch("/seen/:messageId",authMiddleware,messageController.markAsSeen);
router.post("/image",authMiddleware,upload.single("image"),messageController.sendImage);
router.patch("/delete/:messageId",authMiddleware,messageController.deleteMessage);
router.patch("/edit/:messageId",authMiddleware,messageController.editMessage);
router.post("/voice",authMiddleware,upload.single("audio"),messageController.sendVoice);

export default router;