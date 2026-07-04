import Resident from "../models/Resident.js";
import Guest from "../models/Guest.js";
import bcrypt from "bcryptjs";

export const registerResident = async (req, res) => {
  try {
    const { name, flatNo, phone, email, password } = req.body;

    const residentExists = await Resident.findOne({
      $or: [{ email }, { phone }],
    });

    if (residentExists) {
      return res.status(400).json({
        success: false,
        message: "Resident already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const resident = await Resident.create({
      name,
      flatNo,
      phone,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      resident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginResident = async (req, res) => {
  try {
    const { email, password } = req.body;

    const resident = await Resident.findOne({ email });

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      resident.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
       success: true,
      role: "resident",
      user: resident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResidentProfile = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id)
      .populate("guests");

    res.json(resident);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name, flatNo, phone, email, password } = req.body;
    const updateData = {};

    // Only add fields to update if they are provided in the request body
    if (name) updateData.name = name;
    if (flatNo) updateData.flatNo = flatNo;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;

    // Handle password hashing if the resident is changing their password
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const {residentId} = req.params;
    // Find and update the resident, returning the newly updated document
 const updatedResident = await Resident.findByIdAndUpdate(
  residentId, 
  { $set: updateData },
  { returnDocument: 'after' }
).populate("guests");

    if (!updatedResident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      resident: updatedResident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResidentDashboard = async (req, res) => {
  try {
    const { residentId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [
      activeInvitations,
      expectedToday,
      entriesToday,
      activeGuestList,
    ] = await Promise.all([
      Guest.countDocuments({
        resident: residentId,
        status: "Pending",
      }),

      Guest.countDocuments({
        resident: residentId,
        visitDate: {
          $gte: today,
          $lt: tomorrow,
        },
      }),

      Guest.countDocuments({
        resident: residentId,
        status: "Approved",
        entryTime: {
          $gte: today,
          $lt: tomorrow,
        },
      }),

      Guest.find({
        resident: residentId,
        status: "Pending",
      }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        activeInvitations,
        expectedToday,
        entriesToday,
        activeGuestList,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};