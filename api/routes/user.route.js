import express from "express";
import { logout, test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/logout", logout);

export default router;
