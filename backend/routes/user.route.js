import express from "express";
import {
  checkAuth,
  getAllUsers,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
router.get("/users", protectRoute, getAllUsers);

export default router;
