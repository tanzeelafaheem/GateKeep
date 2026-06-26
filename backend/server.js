import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import residentRoutes from "./routes/residentRoutes.js";
import guardRoutes from "./routes/guardRoutes.js";
import guestRoutes from "./routes/guestsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("🔐GateKeep API Running");
});

// Connect Database
await connectDB();

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

app.use("/api/residents", residentRoutes);
app.use("/api/guards", guardRoutes);
app.use("/api/guests", guestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});