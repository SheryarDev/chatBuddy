import express from "express";
const  router=express.Router();
import { signup,login,me } from "../controllers/Auth";
import { checkAuth } from "../middleware/checkAuth";

router.post('/signup',signup)
router.post('/login',login)
router.get('/me',checkAuth,me)

export default router;