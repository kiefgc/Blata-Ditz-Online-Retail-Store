import express from "express";
import * as orderDetailsController from "../controllers/orderDetailsController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Routes
router.get(
  "/order/:order_id",
  authenticateToken,
  orderDetailsController.getOrderDetailsByOrderId
);

// Admin Routes
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  orderDetailsController.addOrderDetail
);
router.patch(
  "/:id",
  authenticateToken,
  requireAdmin,
  orderDetailsController.updateOrderDetail
);
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  orderDetailsController.deleteOrderDetail
);

export default router;
