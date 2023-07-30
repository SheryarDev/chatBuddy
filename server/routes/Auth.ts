import express from "express";
const  router=express.Router();
import { signup,login,me, getUser, getAllUser } from "../controllers/Auth";
import { checkAuth } from "../middleware/checkAuth";

router.post('/signup',signup)
router.post('/login',login)
router.get('/me',checkAuth,me)
router.get('/getUser/:userId',getUser)
router.get('/getAllUsers',getAllUser)


export default router;