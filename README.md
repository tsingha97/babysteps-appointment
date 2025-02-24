# Advanced Babysteps Appointment Booking System

A full-stack appointment scheduling system for prenatal care services, featuring doctor availability calculations and appointment management.

## Features

- **Doctor Selection**: Choose from available doctors with predefined working hours.
- **Available Time Slot Calculation**: Dynamically generated based on doctor schedules.
- **Appointment Booking**: Schedule appointments in 30-minute slots.
- **Edit/Cancel Appointments**: Modify or remove existing bookings.
- **Upcoming Appointments List**: View scheduled appointments.
- **Conflict Prevention**: Ensures no double bookings.

---

## Tech Stack

### **Backend**

- Node.js | Express | MongoDB | Mongoose | date-fns

### **Frontend**

- React | Vite | Axios | date-fns | CSS

---

## Installation

### **Prerequisites**

- Node.js (v18+)
- npm (v9+)
- MongoDB (running locally)

### **Clone the Project**

```bash
git clone https://github.com/tsingha97/babysteps-appointment.git
cd babysteps-appointment
```

### **Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB:
   ```bash
   mongod
   ```
4. (Optional) Seed the database:
   ```bash
   mongo
   use babysteps
   db.doctors.insertMany([
     { name: "Dr. John Doe", workingHours: { start: "08:00", end: "16:00" } },
     { name: "Dr. Jane Smith", workingHours: { start: "09:00", end: "17:00" } }
   ])
   ```
5. Create a `.env` file and configure the database connection:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/babysteps
   PORT=5000
   ```
6. Start the backend server:
   ```bash
   npm start
   ```
   The server will run at: **http://localhost:5000**

### **Frontend Setup**

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run dev
   ```
   Access the app at: **http://localhost:5173**

---

## Assumptions & Design Decisions

### **Core Assumptions**

- **No Authentication**: Open access for demo purposes.
- **Fixed Working Hours**: All doctors follow the same daily schedule.
- **30-Minute Slots**: Fixed appointment duration.
- **Local Time Zone**: No timezone conversions.
- **Single Clinic**: No multi-location support.

### **Key Design Choices**

#### **Slot Calculation**

- Generates available slots from the doctor's working hours.
- Excludes already booked slots using MongoDB queries.
- Uses `date-fns` for time calculations.

#### **State Management**

- No React Context API for simplicity.
- Uses prop drilling for parent-child communication.
- Local state management for UI interactions.

#### **Error Handling**

- Basic HTTP status code responses.
- Console logging for frontend errors.
- No retry mechanisms implemented.

#### **Database Modeling**

- Uses **Doctors** and **Appointments** collections.
- Ensures referential integrity via `doctorId` in Appointments.
- No soft delete—appointments are permanently removed upon cancellation.

#### **UI/UX**

- Minimalist design with basic CSS.
- No loading spinners or skeleton loaders.
- Form validation only for required fields.

---

## Troubleshooting

### **MongoDB Connection Issues**

- Ensure MongoDB is running by executing:
  ```bash
  mongod
  ```

### **Missing Dependencies**

- Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules && npm install
  ```

### **CORS Errors**

- Verify that the backend is running on port `5000` and the frontend on `5173`.

### **Time Slot Mismatches**

- Ensure your system time zone matches MongoDB's stored time format.

---

This concludes the setup and overview of the **Advanced Babysteps Appointment Booking System**.
