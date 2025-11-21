import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/suppliersRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/admin", adminRoutes);
app.use("/authentication", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/orders", orderRoutes);

app.use("/uploads", express.static("uploads"));
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
