import express from "express";
import * as orderController from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Used by both admin and customer; requires login
router.get("/", authenticateToken, orderController.getAllOrders);
router.get("/:id", authenticateToken, orderController.getOrderById);
router.post("/", authenticateToken, orderController.createOrder);
router.patch("/:id", authenticateToken, orderController.updateOrder);
router.delete("/:id", authenticateToken, orderController.deleteOrder);

export default router;
