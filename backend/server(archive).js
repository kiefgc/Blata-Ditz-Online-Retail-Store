import express from "express";
import dotenv from "dotenv";
import mongodb from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// MongoDB setup
const client = new mongodb.MongoClient(process.env.MONGODB_URI);
const dbName = process.env.MONGODB_NAME || "blataditz-ors";
let customersCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    customersCollection = db.collection("customers");

    defineRoutes();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

function defineRoutes() {
  app.post("/authentication/register", async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        first_name,
        last_name,
        phone,
        address,
      } = req.body;

      if (
        !username ||
        !email ||
        !password ||
        !first_name ||
        !last_name ||
        !phone ||
        !address
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const existingUser = await customersCollection.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newCustomer = {
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        phone,
        address,
        created_at: new Date(),
      };
      const result = await customersCollection.insertOne(newCustomer);

      res.status(201).json({
        data: result,
        message: "Customer created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Protected route" });
  });
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

connectToDatabase();
