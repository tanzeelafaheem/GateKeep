import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("🔐GateKeep API Running");
});

// Connect Database
await connectDB();

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});