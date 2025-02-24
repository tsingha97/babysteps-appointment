import { useState } from "react";
import { format, addDays } from "date-fns";

const DatePicker = ({ selectedDate, onChange }) => {
  // Initialize state with the currently selected date
  const [currentDate, setCurrentDate] = useState(selectedDate);

  // Function to change the selected date by adding or subtracting days
  const handleDateChange = (days) => {
    const newDate = addDays(currentDate, days);
    setCurrentDate(newDate);
    onChange(newDate);
  };

  return (
    <div className="date-picker">
      <button onClick={() => handleDateChange(-1)}>Previous</button>
      <span>{format(currentDate, "yyyy-MM-dd")}</span>
      <button onClick={() => handleDateChange(1)}>Next</button>
    </div>
  );
};

export default DatePicker;
