import express from "express";
import {
  registerResident,
  loginResident,
  getResidentProfile,
  updateProfile,
  getResidentDashboard
} from "../controllers/residentController.js";

const router = express.Router();

router.post("/register", registerResident);
router.post("/login", loginResident);
router.get("/profile/:id", getResidentProfile);
router.post("/edit-profile/:residentId", updateProfile);
router.get("/dashboard/:residentId", getResidentDashboard);

export default router;