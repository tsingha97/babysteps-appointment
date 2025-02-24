const DoctorList = ({ doctors, selectedDoctor, onSelect }) => {
  return (
    <div className="doctor-list">
      <h2>Select a Doctor</h2>
      {doctors.map((doctor) => (
        <button
          key={doctor._id}
          className={`doctor-card ${
            selectedDoctor?._id === doctor._id ? "selected" : ""
          }`}
          onClick={() => onSelect(doctor)}
        >
          <h3>{doctor.name}</h3>
          <p>
            Working Hours: {doctor.workingHours.start} -{" "}
            {doctor.workingHours.end}
          </p>
        </button>
      ))}
    </div>
  );
};

export default DoctorList;
