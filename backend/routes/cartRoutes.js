import express from "express";
import * as cartController from "../controllers/cartController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Routes

router.post("/:customer_id/add", authenticateToken, cartController.addItem);

router.post("/checkout", authenticateToken, cartController.checkoutCart);

router.get("/:customer_id", authenticateToken, cartController.getCart);

router.patch(
  "/:customer_id/update",
  authenticateToken,
  cartController.updateQuantity
);

router.delete(
  "/:customer_id/remove/:product_id",
  authenticateToken,
  cartController.removeItem
);

// Clear the entire cart (e.g., after order creation)
router.delete("/:customer_id", authenticateToken, cartController.deleteCart);

// Admin Routes

router.get("/", authenticateToken, requireAdmin, cartController.getCart);

router.post(
  "/admin/:customer_id/add",
  authenticateToken,
  requireAdmin,
  cartController.addItem
);

router.patch(
  "/admin/:customer_id/update",
  authenticateToken,
  requireAdmin,
  cartController.updateQuantity
);

router.delete(
  "/admin/:customer_id/remove/:product_id",
  authenticateToken,
  requireAdmin,
  cartController.removeItem
);

router.delete(
  "/admin/:customer_id",
  authenticateToken,
  requireAdmin,
  cartController.deleteCart
);

export default router;
