import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword, changePasswword, updateUser } from "../controller/user.controller.js";
import { isLoggedIn } from "../midleware/auth.midleware.js";
import upload from "../modules/multer.midleware.js";
import uploadSingle from "../modules/uploadSingle.js";
const router = Router()
router.post('/register', uploadSingle,register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggedIn, getProfile)
router.post('forgot-password',forgotPassword)
router.post('/reset',resetPassword);
router.post('/change-password',isLoggedIn,changePasswword)
router.put('/update',isLoggedIn,upload.single("avatar"),updateUser)
export default router;