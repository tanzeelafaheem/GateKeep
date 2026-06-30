import Guest from "../models/Guest.js";
import Resident from "../models/Resident.js";
import QRCode from "qrcode";

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

    const qrCode = await QRCode.toDataURL(qrPayload);

    const guest = await Guest.create({
      resident: residentId,
      name,
      phone,
      purpose,
      visitDate,
      visitTime,
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
    
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    let query = Guest.find({ resident: residentId }).sort({ createdAt: -1 });

    // Apply limit only if the frontend explicitly asks for it
    if (limit) {
      query = query.limit(limit);
    }

    const guests = await query;

    res.status(200).json({
      success: true,
      count: guests.length,
      guests,
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
    const { guestId } = req.params;

    const guest = await Guest.findById(guestId)
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