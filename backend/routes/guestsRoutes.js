import express from "express";
import {
  createGuest,
  getResidentGuests,
  getGuestById,
  verifyGuest,
  approveGuest,
  completeVisit,
  deleteGuest,
  rejectGuest
} from "../controllers/guestsController.js";

const router = express.Router();

router.post("/create", createGuest);
router.get("/resident/:residentId", getResidentGuests);
router.get("/:qrCode", getGuestById);
router.get("/verify/:guestId", verifyGuest);
router.patch("/approve/:guestId", approveGuest);
router.patch("/reject/:guestId",rejectGuest)
router.patch("/complete/:guestId", completeVisit);
router.delete("/:guestId", deleteGuest);

export default router;