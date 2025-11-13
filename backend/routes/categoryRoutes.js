import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

// Admin-only Routes
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  categoryController.createCategory
);
router.patch(
  "/:id",
  authenticateToken,
  requireAdmin,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  categoryController.deleteCategory
);

export default router;
