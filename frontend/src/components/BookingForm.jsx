import { useState } from "react";

const BookingForm = ({ initialData, onClose, onSubmit, isEditMode }) => {
  const [formData, setFormData] = useState(
    initialData || {
      patientName: "",
      appointmentType: "Routine Check-Up",
      notes: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <h3>{isEditMode ? "Edit" : "Book"} Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) =>
                setFormData({ ...formData, patientName: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Appointment Type</label>
            <select
              value={formData.appointmentType}
              onChange={(e) =>
                setFormData({ ...formData, appointmentType: e.target.value })
              }
            >
              <option value="Routine Check-Up">Routine Check-Up</option>
              <option value="Ultrasound">Ultrasound</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
