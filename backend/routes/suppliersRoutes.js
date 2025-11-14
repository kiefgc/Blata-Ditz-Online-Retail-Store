import express from "express";
import * as supplierController from "../controllers/supplierController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only Routes
router.get(
  "/",
  authenticateToken,
  requireAdmin,
  supplierController.getAllSuppliers
);
router.get(
  "/:id",
  authenticateToken,
  requireAdmin,
  supplierController.getSupplierById
);
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
