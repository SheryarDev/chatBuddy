import express from "express";
const  router=express.Router();
import { NewConversation,getUserConversations } from "../controllers/Conversation";

router.post('/new-conversation',NewConversation)
router.get('/fetch-conversation/:userId',getUserConversations)

export default router;