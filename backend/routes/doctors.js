const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const { generateAvailableSlots } = require("../utils/slotUtils");

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get available slots for a doctor
router.get("/:id/slots", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    const date = new Date(req.query.date);

    const slots = await generateAvailableSlots(doctor, date);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
