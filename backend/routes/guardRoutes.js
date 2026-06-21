import {
    getGuardProfile,
    loginGuard,
    registerGuard,
    updateProfile
} from "../controllers/guardController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerGuard);
router.post("/login", loginGuard);
router.get("/profile/:id", getGuardProfile);
router.post("/edit-profile/:id", updateProfile);

export default router;