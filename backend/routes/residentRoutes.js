import express from "express";
import {
  registerResident,
  loginResident,
  getResidentProfile,
  updateProfile,
} from "../controllers/residentController.js";

const router = express.Router();

router.post("/register", registerResident);
router.post("/login", loginResident);
router.get("/profile/:id", getResidentProfile);
router.post("/edit-profile/:id", updateProfile);

export default router;