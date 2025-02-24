import { useState } from "react";
import axios from "axios";
import BookingForm from "./BookingForm";
import { format, parseISO } from "date-fns";

function TimeSlots({ slots, doctor, date }) {
  // State to control the visibility of the booking form
  const [showForm, setShowForm] = useState(false);
  // State to store the selected time slot
  const [selectedTime, setSelectedTime] = useState("");
  // State to handle any error messages
  const [error, setError] = useState("");

  // Function to handle booking an appointment
  const handleBooking = async (formData) => {
    try {
      const dateString = format(date, "yyyy-MM-dd");
      // Combine selected date and time into a proper date-time format
      const dateTime = parseISO(`${dateString}T${selectedTime}:00`);

      // Send a POST request to the server to book an appointment
      const response = await axios.post("http://localhost:5000/appointments", {
        ...formData,
        doctorId: doctor._id,
        date: dateTime.toISOString(),
      });

      // If booking is successful, close the form and refresh the page
      if (response.data) {
        setShowForm(false);
        window.location.reload(); // Refresh to update slots
      }
    } catch (err) {
      // Handle any errors that occur during booking
      setError("Failed to book appointment. Please try again.");
      console.error("Booking error:", err);
    }
  };

  return (
    <div className="time-slots">
      <h3>Available Slots for {format(date, "yyyy-MM-dd")}</h3>
      {/* Display error message if booking fails */}
      {error && <p className="error">{error}</p>}

      <div className="slot-grid">
        {/* Render available time slots as buttons */}
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

      {/* Show booking form when a slot is selected */}
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
