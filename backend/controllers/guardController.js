import Guard from "../models/Guard.js";
import bcrypt from "bcryptjs";

export const registerGuard = async (req, res) => {
    try{
        const {name,employeeId,phone,password,gate} = req.body;
        const guardExists = await Guard.findOne({
            $or: [{employeeId}, {phone}]
        });
        if(guardExists){
            return res.status(400).json({
                success: false,
                message: "Guard already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const guard = await Guard.create({
            name,
            employeeId,
            phone,
            password: hashedPassword,
            gate
        });
        res.status(201).json({
            success: true,
            guard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const loginGuard = async (req, res) => {
    try {
        const {employeeId, password} = req.body;
        const guard = await Guard.findOne({employeeId});
        if(!guard){
            return res.status(404).json({
                success: false,
                message: "Guard not found"
            });
        }
        const isMatch = await bcrypt.compare(password, guard.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        res.status(200).json({
            success: true,
            guard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getGuardProfile = async (req, res) => {
    try {
        const guard = await Guard.findById(req.params.id);
        if(!guard){
            return res.status(404).json({
                success: false,
                message: "Guard not found"
            });
        }
        res.status(200).json({
            success: true,
            guard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, employeeId, phone, password, gate } = req.body;
    const updateData = {};

    // Only add fields to update if they are provided in the request body
    if (name) updateData.name = name;
    if (employeeId) updateData.employeeId = employeeId;
    if (phone) updateData.phone = phone;
    if (gate) updateData.gate = gate;

    // Handle password hashing if the guard is changing their password
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedGuard = await Guard.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );  
    if (!updatedGuard) {
      return res.status(404).json({
        success: false,
        message: "Guard not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      guard: updatedGuard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
