import {
    getGuardProfile,
    loginGuard,
    registerGuard
} from "../controllers/guardController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerGuard);
router.post("/login", loginGuard);
router.get("/profile/:id", getGuardProfile);

export default router;