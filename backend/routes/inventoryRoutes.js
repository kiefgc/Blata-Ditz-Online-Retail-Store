import express from "express";
import * as inventoryController from "../controllers/inventoryController.js";
import * as middleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only routes

router.get(
  "/",
  middleware.authenticateToken,
  middleware.requireAdmin,
  inventoryController.getInventory
);
router.get(
  "/:productId",
  middleware.authenticateToken,
  middleware.requireAdmin,
  inventoryController.getInventoryItem
);
router.post(
  "/",
  middleware.authenticateToken,
  middleware.requireAdmin,
  inventoryController.createInventory
);
router.patch(
  "/:productId",
  middleware.authenticateToken,
  middleware.requireAdmin,
  inventoryController.updateInventory
);
router.delete(
  "/:productId",
  middleware.authenticateToken,
  middleware.requireAdmin,
  inventoryController.deleteInventory
);

export default router;
