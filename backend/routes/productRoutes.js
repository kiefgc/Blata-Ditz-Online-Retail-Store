import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin-only Routes
router.post("/", authenticateToken, requireAdmin, createProduct);
router.patch("/:id", authenticateToken, requireAdmin, updateProduct);
router.delete("/:id", authenticateToken, requireAdmin, deleteProduct);

export default router;
