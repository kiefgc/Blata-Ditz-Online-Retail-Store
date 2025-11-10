import express from "express";
import * as adminController from "../controllers/adminController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, requireAdmin, adminController.createAdmin);
router.get("/", authenticateToken, requireAdmin, adminController.getAllAdmins);
router.get(
  "/users/:id",
  authenticateToken,
  requireAdmin,
  adminController.getUserById
);

export default router;
