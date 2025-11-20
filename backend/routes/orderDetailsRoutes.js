import express from "express";
import * as orderDetailsController from "../controllers/orderDetailsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Used by both admin and customer; requires login
router.get(
  "/:order_id",
  authenticateToken,
  orderDetailsController.getOrderDetailsByOrderId
);
router.post("/", authenticateToken, orderDetailsController.addOrderDetail);
router.patch(
  "/:id",
  authenticateToken,
  orderDetailsController.updateOrderDetail
);
router.delete(
  "/:id",
  authenticateToken,
  orderDetailsController.deleteOrderDetail
);

export default router;
