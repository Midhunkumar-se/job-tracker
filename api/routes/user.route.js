import express from "express";
import { test, updateUser, logout } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/logout", logout);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
