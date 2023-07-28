import express from "express";
const  router=express.Router();
import { addMessage ,fetchMessages} from "../controllers/Messages";

router.post("/add-message",addMessage)
router.get("/fetch-messages/:conversationId",fetchMessages)
export default router;