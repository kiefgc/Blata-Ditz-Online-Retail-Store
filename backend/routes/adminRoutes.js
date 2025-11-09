import express from "express";
import { createAdmin, getAllAdmins } from "../controllers/adminController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, requireAdmin, createAdmin);
router.get("/", authenticateToken, requireAdmin, getAllAdmins);

export default router;
