const {
  addMinutes,
  parseISO,
  format,
  setHours,
  setMinutes,
} = require("date-fns");
const Appointment = require("../models/Appointment");

const generateAvailableSlots = async (doctor, date) => {
  const [startHour, startMinute] = doctor.workingHours.start
    .split(":")
    .map(Number);
  const [endHour, endMinute] = doctor.workingHours.end.split(":").map(Number);

  const startDate = setMinutes(setHours(date, startHour), startMinute);
  const endDate = setMinutes(setHours(date, endHour), endMinute);

  let currentSlot = startDate;
  const allSlots = [];

  while (currentSlot < endDate) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, 30);
  }

  const existingAppointments = await Appointment.find({
    doctorId: doctor._id,
    date: { $gte: startDate, $lt: endDate },
  });

  const bookedSlots = existingAppointments.map((a) => a.date.getTime());
  return allSlots
    .filter((slot) => !bookedSlots.includes(slot.getTime()))
    .map((slot) => format(slot, "HH:mm"));
};

module.exports = { generateAvailableSlots };
