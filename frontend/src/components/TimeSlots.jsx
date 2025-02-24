import { useState } from "react";
import axios from "axios";
import BookingForm from "./BookingForm";
import { format, parseISO } from "date-fns";

function TimeSlots({ slots, doctor, date }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");

  const handleBooking = async (formData) => {
    try {
      // Combine selected date and time
      const dateString = format(date, "yyyy-MM-dd");
      const dateTime = parseISO(`${dateString}T${selectedTime}:00`);

      const response = await axios.post("http://localhost:5000/appointments", {
        ...formData,
        doctorId: doctor._id,
        date: dateTime.toISOString(),
      });

      if (response.data) {
        setShowForm(false);
        window.location.reload(); // Refresh to update slots
      }
    } catch (err) {
      setError("Failed to book appointment. Please try again.");
      console.error("Booking error:", err);
    }
  };

  return (
    <div className="time-slots">
      <h3>Available Slots for {format(date, "yyyy-MM-dd")}</h3>
      {error && <p className="error">{error}</p>}

      <div className="slot-grid">
        {slots.map((slot) => (
          <button
            key={slot}
            className="slot"
            onClick={() => {
              setSelectedTime(slot);
              setShowForm(true);
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      {showForm && (
        <BookingForm
          onClose={() => setShowForm(false)}
          onSubmit={handleBooking}
        />
      )}
    </div>
  );
}

export default TimeSlots;
