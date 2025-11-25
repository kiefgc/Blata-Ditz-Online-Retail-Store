import express from "express";
import * as authController from "../controllers/authController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Used by both admin and customer

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);
router.get("/users/me", authenticateToken, authController.getProfile);
router.patch("/users/me", authenticateToken, authController.updateProfile);
router.delete("/users/me", authenticateToken, authController.deleteProfile);

export default router;
