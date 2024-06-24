import express from "express";
import { login, register,updatePassword,updateProfile,verify} from "../controllers/user.js";
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifyUser, verify);
router.put("/update-profile", verifyUser, updateProfile);
router.put("/update-password", verifyUser, updatePassword);


export default router;