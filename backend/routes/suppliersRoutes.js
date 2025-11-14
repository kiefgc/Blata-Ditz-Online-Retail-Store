import express from "express";
import * as supplierController from "../controllers/supplierController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", supplierController.getAllSuppliers);
router.get("/:id", supplierController.getSupplieryById);

// Admin-only Routes
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  supplierController.addSupplier
);
router.patch(
  "/:id",
  authenticateToken,
  requireAdmin,
  supplierController.updateSupplier
);
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  supplierController.deleteSupplier
);

export default router;
