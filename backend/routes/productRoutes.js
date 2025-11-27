import express from "express";
import { upload } from "../config/multer.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from "../controllers/productController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/:id", getProductById);

// Admin-only Routes
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  createProduct
);
router.patch(
  "/:id",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/:id", authenticateToken, requireAdmin, deleteProduct);

export default router;
