import Guest from "../models/Guest.js";
import Resident from "../models/Resident.js";
import QRCode from "qrcode";
import crypto from "crypto";

/*
|--------------------------------------------------------------------------
| Create Guest Invitation
|--------------------------------------------------------------------------
*/

export const createGuest = async (req, res) => {
  try {
    const {
      residentId,
      name,
      phone,
      purpose,
      visitDate,
      visitTime,
    } = req.body;

    // Check resident exists
    const resident = await Resident.findById(residentId);

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found",
      });
    }

    // Create QR payload
    const qrPayload = JSON.stringify({
      residentId,
      name,
      phone,
      visitDate,
      visitTime,
    });

    const qrImage = await QRCode.toDataURL(qrPayload);
    const qrCode = crypto.randomBytes(8).toString("hex").toUpperCase();

    const guest = await Guest.create({
      resident: residentId,
      name,
      phone,
      purpose,
      visitDate,
      visitTime,
      qrImage,
      qrCode,
      status: "Pending",
    });

    // Add guest to resident's guest list
    resident.guests.push(guest._id);
    await resident.save();

    res.status(201).json({
      success: true,
      message: "Guest invitation created successfully",
      guest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Guests Of Resident
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Get All Guests Of Resident (Supports Recent Limit & Full History)
|--------------------------------------------------------------------------
*/
export const getResidentGuests = async (req, res) => {
  try {
    const { residentId } = req.params;
    
    // Parse query parameters safely
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    // 1. Get total count for metadata (needed by the history page pagination)
    const totalGuests = await Guest.countDocuments({ resident: residentId });

    // 2. Build the base query
    let query = Guest.find({ resident: residentId }).sort({ createdAt: -1 });

    // 3. Apply pagination conditionally based on what the frontend requests
    if (limit) {
      if (page) {
        // Scenario 1: History Page (with page and limit)
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
      } else {
        // Scenario 2: Dashboard (only a limit, no page parameter)
        query = query.limit(limit);
      }
    }

    const guests = await query;

    // 4. Return standard response along with pagination metadata
    res.status(200).json({
      success: true,
      count: guests.length,
      guests,
      // Metadata fields defaults when no pagination parameters are used
      currentPage: page || 1,
      totalPages: limit ? Math.ceil(totalGuests / limit) : 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/*
|--------------------------------------------------------------------------
| Get Single Guest
|--------------------------------------------------------------------------
*/

export const getGuestById = async (req, res) => {
  try {
    const { qrCode } = req.params;

    const guest = await Guest.findOne({ qrCode })
      .populate("resident", "name flatNo phone email");

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    res.status(200).json({
      success: true,
      guest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Verify Guest (QR Scan)
|--------------------------------------------------------------------------
*/

export const verifyGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findById(guestId)
      .populate("resident", "name flatNo phone");

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    res.status(200).json({
      success: true,
      guest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Approve Guest Entry
|--------------------------------------------------------------------------
*/

export const approveGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findById(guestId);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    guest.status = "Entered";
    guest.entryTime = new Date();

    await guest.save();

    res.status(200).json({
      success: true,
      message: "Guest entry approved",
      guest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findById(guestId);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    guest.status = "Rejected";
    guest.entryTime = new Date();

    await guest.save();

    res.status(401).json({
      success: true,
      message: "Guest entry not approved",
      guest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/*
|--------------------------------------------------------------------------
| Mark Guest Exit
|--------------------------------------------------------------------------
*/

export const completeVisit = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findById(guestId);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    guest.status = "Completed";
    guest.exitTime = new Date();

    await guest.save();

    res.status(200).json({
      success: true,
      message: "Guest visit completed",
      guest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Guest Invitation
|--------------------------------------------------------------------------
*/

export const deleteGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findById(guestId);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    await Resident.findByIdAndUpdate(
      guest.resident,
      {
        $pull: {
          guests: guest._id,
        },
      }
    );

    await Guest.findByIdAndDelete(guestId);

    res.status(200).json({
      success: true,
      message: "Guest deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};