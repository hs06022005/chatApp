import express from "express";
import chatController from "../controller/chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",authMiddleware,chatController.getChats);
router.post("/group",authMiddleware,chatController.createGroup);
router.patch( "/add-member", authMiddleware, chatController.addMember);
router.patch( "/remove-member", authMiddleware, chatController.removeMember);
router.patch( "/leave-group", authMiddleware, chatController.leaveGroup);
router.patch( "/transfer-admin", authMiddleware, chatController.transferAdmin);
router.delete("/:groupId",authMiddleware,chatController.deleteGroup);

export default router;