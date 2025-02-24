const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new appointment
router.post("/", async (req, res) => {
  const appointment = new Appointment(req.body);

  try {
    const existingAppointment = await Appointment.findOne({
      doctorId: appointment.doctorId,
      date: appointment.date,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update appointment
router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    // Check for time slot availability (exclude current appointment)
    const existing = await Appointment.findOne({
      doctorId: req.body.doctorId,
      date: req.body.date,
      _id: { $ne: req.params.id },
    });

    if (existing) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("doctorId");

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
