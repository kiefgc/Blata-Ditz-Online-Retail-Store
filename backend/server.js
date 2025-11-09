import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import app from "./app.js";
import { seedFirstAdmin } from "./controllers/adminController.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    await seedFirstAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start: ", err);
  }
}

startServer();
