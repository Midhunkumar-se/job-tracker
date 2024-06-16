import express from "express";
import {
  test,
  updateUser,
  logout,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/logout", logout);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
