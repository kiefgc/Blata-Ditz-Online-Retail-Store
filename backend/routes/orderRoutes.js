import express from "express";
import * as orderController from "../controllers/orderController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Routes

router.post("/", authenticateToken, orderController.createOrder);
router.get("/", authenticateToken, orderController.getAllOrders);
router.get("/:id", authenticateToken, orderController.getOrderById);
router.patch("/:id", authenticateToken, orderController.updateOrderByCustomer);

// Admin Routes

router.patch(
  "/:id/:status",
  authenticateToken,
  requireAdmin,
  orderController.updateOrderStatus
);
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  orderController.deleteOrder
);

export default router;
