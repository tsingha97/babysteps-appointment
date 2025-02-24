import { format } from "date-fns";
import { useState } from "react";
import BookingForm from "./BookingForm";

const AppointmentsList = ({ appointments, onDelete, onUpdate }) => {
  // State to track the appointment being edited
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Function to handle submission of the edited appointment
  const handleEditSubmit = async (formData) => {
    const success = await onUpdate(editingAppointment._id, {
      ...formData,
      date: editingAppointment.date, // Keep existing date unless changed
      doctorId: editingAppointment.doctorId._id,
    });

    // Close the editing form if update is successful
    if (success) setEditingAppointment(null);
  };

  return (
    <div className="appointments-list">
      <h2>Upcoming Appointments</h2>

      {/* Display message if no appointments are booked */}
      {appointments.length === 0 ? (
        <p className="no-appointments">No upcoming appointments booked yet.</p>
      ) : (
        <div className="appointments-grid">
          {/* Render each appointment card */}
          {appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
              <div className="appointment-header">
                <h3 className="appointment-type">
                  {appointment.appointmentType}
                </h3>
                <span className="appointment-date">
                  {format(new Date(appointment.date), "MMM dd, yyyy @ HH:mm")}
                </span>
              </div>

              {/* Display appointment details */}
              <div className="appointment-details">
                <p>
                  <strong>Doctor:</strong>{" "}
                  {appointment.doctorId?.name || "Unknown Doctor"}
                </p>
                <p>
                  <strong>Patient:</strong> {appointment.patientName}
                </p>
                {appointment.notes && (
                  <p className="appointment-notes">
                    <strong>Notes:</strong> {appointment.notes}
                  </p>
                )}
              </div>

              {/* Buttons for editing and deleting appointments */}
              <div className="appointment-actions">
                <button
                  className="edit-btn"
                  onClick={() => setEditingAppointment(appointment)}
                >
                  Edit
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => onDelete(appointment._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}

          {/* Render booking form when an appointment is being edited */}
          {editingAppointment && (
            <BookingForm
              initialData={{
                patientName: editingAppointment.patientName,
                appointmentType: editingAppointment.appointmentType,
                notes: editingAppointment.notes,
              }}
              onClose={() => setEditingAppointment(null)}
              onSubmit={handleEditSubmit}
              isEditMode={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
