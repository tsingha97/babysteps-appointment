import { useState, useEffect } from "react";
import axios from "axios";
import DoctorList from "./components/DoctorList";
import DatePicker from "./components/DatePicker";
import TimeSlots from "./components/TimeSlots";
import AppointmentsList from "./components/AppointmentsList";

const App = () => {
  const [doctors, setDoctors] = useState([]); // State to hold the list of doctors
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to track the selected doctor
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track the selected date
  const [slots, setSlots] = useState([]); // State to hold the available time slots
  const [appointments, setAppointments] = useState([]); // State to hold the list of appointments

  // Fetch doctors and appointments from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Function to fetch available time slots for a selected doctor on a given date
  const loadSlots = async (doctorId, date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const res = await axios.get(
      `http://localhost:5000/doctors/${doctorId}/slots?date=${formattedDate}`
    );
    setSlots(res.data);
  };

  // Function to handle appointment deletion
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Function to handle appointment updates
  const handleUpdateAppointment = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/appointments/${id}`,
        updatedData
      );
      // Update the state with the modified appointment
      setAppointments(
        appointments.map((a) => (a._id === id ? response.data : a))
      );
      return true;
    } catch (err) {
      console.error("Update failed:", err);
      return false;
    }
  };

  return (
    <div className="container">
      <h1>Babysteps Appointment Booking</h1>
      {/* Component to display the list of doctors and allow selection */}
      <DoctorList
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        onSelect={(doctor) => {
          setSelectedDoctor(doctor);
          loadSlots(doctor._id, selectedDate);
        }}
      />
      {/* Show date picker and available time slots if a doctor is selected */}
      {selectedDoctor && (
        <>
          <DatePicker
            selectedDate={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              loadSlots(selectedDoctor._id, date);
            }}
          />
          <TimeSlots
            slots={slots}
            doctor={selectedDoctor}
            date={selectedDate}
          />
        </>
      )}
      {/* Component to display the list of booked appointments*/}
      <AppointmentsList
        appointments={appointments}
        onDelete={handleDeleteAppointment}
        onUpdate={handleUpdateAppointment}
      />
    </div>
  );
};

export default App;
