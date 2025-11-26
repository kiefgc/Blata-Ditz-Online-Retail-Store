import express from "express";
import * as orderController from "../controllers/orderController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Routes

router.post("/", authenticateToken, orderController.createOrder);
router.get("/:id", authenticateToken, orderController.getOrderById);
router.patch("/:id", authenticateToken, orderController.updateOrderByCustomer);

// Admin Routes
router.get("/admin", authenticateToken, orderController.getAllOrders);
router.post(
  "/admin",
  authenticateToken,
  requireAdmin,
  orderController.createOrder
);
router.patch(
  "/admin/:id",
  authenticateToken,
  requireAdmin,
  orderController.updateOrderStatus
);
router.delete(
  "/admin/:id",
  authenticateToken,
  requireAdmin,
  orderController.deleteOrder
);

export default router;
