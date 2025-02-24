import { useState, useEffect } from "react";
import axios from "axios";
import DoctorList from "./components/DoctorList";
import DatePicker from "./components/DatePicker";
import TimeSlots from "./components/TimeSlots";
import AppointmentsList from "./components/AppointmentsList";

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);

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

  const loadSlots = async (doctorId, date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const res = await axios.get(
      `http://localhost:5000/doctors/${doctorId}/slots?date=${formattedDate}`
    );
    setSlots(res.data);
  };

  // Add these functions to your App component
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdateAppointment = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/appointments/${id}`,
        updatedData
      );
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
      <DoctorList
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        onSelect={(doctor) => {
          setSelectedDoctor(doctor);
          loadSlots(doctor._id, selectedDate);
        }}
      />

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

      <AppointmentsList
        appointments={appointments}
        onDelete={handleDeleteAppointment}
        onUpdate={handleUpdateAppointment}
      />
    </div>
  );
};

export default App;
