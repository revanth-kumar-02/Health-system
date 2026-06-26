// LocalStorage database utilities and seed data

export const DB_KEYS = {
  USERS: 'users',
  LOGGED_IN_USER: 'loggedInUser',
  DOCTORS: 'doctors',
  DEPARTMENTS: 'departments',
  SCHEDULES: 'schedules',
  APPOINTMENTS: 'appointments',
};

// Generic storage getters and setters
export const getDB = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
};

export const setDB = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

export const getLoggedInUser = () => {
  try {
    const data = localStorage.getItem(DB_KEYS.LOGGED_IN_USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading loggedInUser:", error);
    return null;
  }
};

export const setLoggedInUser = (user) => {
  if (user) {
    localStorage.setItem(DB_KEYS.LOGGED_IN_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(DB_KEYS.LOGGED_IN_USER);
  }
};

// Seed database with sample data if empty
export const seedDatabase = () => {
  // 1. Seed Users
  let users = getDB(DB_KEYS.USERS);
  if (!users || users.length === 0) {
    users = [
      {
        id: "admin001",
        name: "Dr. Smith",
        email: "admin@hospital.com",
        role: "admin",
        password: "admin123",
        phone: "555-0199",
      },
      // Sample Patients
      {
        id: "pat001",
        name: "Alex Johnson",
        email: "alex@patient.com",
        role: "patient",
        password: "patient123",
        phone: "123-456-7890",
        gender: "Male",
        dob: "1990-01-15",
      },
      {
        id: "pat002",
        name: "Jane Doe",
        email: "jane@patient.com",
        role: "patient",
        password: "patient123",
        phone: "987-654-3210",
        gender: "Female",
        dob: "1992-05-20",
      },
      {
        id: "pat003",
        name: "Michael Scott",
        email: "michael@patient.com",
        role: "patient",
        password: "patient123",
        phone: "555-555-5555",
        gender: "Male",
        dob: "1980-03-15",
      },
      // Sample Doctors (credentials matching sample doctors below)
      {
        id: "doc001",
        name: "Dr. Ravi Kumar",
        email: "ravi@hospital.com",
        role: "doctor",
        password: "doctor123",
        phone: "111-222-3333",
      },
      {
        id: "doc002",
        name: "Dr. Priya Sharma",
        email: "priya@hospital.com",
        role: "doctor",
        password: "doctor123",
        phone: "222-333-4444",
      },
      {
        id: "doc003",
        name: "Dr. Arun Raj",
        email: "arun@hospital.com",
        role: "doctor",
        password: "doctor123",
        phone: "333-444-5555",
      },
      {
        id: "doc004",
        name: "Dr. Meena Thomas",
        email: "meena@hospital.com",
        role: "doctor",
        password: "doctor123",
        phone: "444-555-6666",
      }
    ];
    setDB(DB_KEYS.USERS, users);
  }

  // 2. Seed Departments
  let departments = getDB(DB_KEYS.DEPARTMENTS);
  if (!departments || departments.length === 0) {
    departments = [
      { departmentId: "dep001", departmentName: "General Medicine", description: "Primary healthcare, diagnosis, and treatment of common adult medical conditions.", status: "Active" },
      { departmentId: "dep002", departmentName: "Cardiology", description: "Advanced heart care, diagnostics, and therapeutic interventions for cardiovascular health.", status: "Active" },
      { departmentId: "dep003", departmentName: "Dental", description: "Comprehensive dental services including scaling, fillings, root canals, and cosmetic dentistry.", status: "Active" },
      { departmentId: "dep004", departmentName: "Orthopedic", description: "Care for bone, joint, ligament, and muscle disorders, sports injuries, and joint replacements.", status: "Active" },
      { departmentId: "dep005", departmentName: "Pediatrics", description: "Compassionate healthcare and medical monitoring for infants, toddlers, children, and teenagers.", status: "Active" },
      { departmentId: "dep006", departmentName: "ENT", description: "Specialized treatment for diseases of the ear, nose, throat, and related structures of the head.", status: "Active" },
      { departmentId: "dep007", departmentName: "Dermatology", description: "Diagnosis and therapy for conditions related to skin, hair, nails, and cosmetic concerns.", status: "Active" }
    ];
    setDB(DB_KEYS.DEPARTMENTS, departments);
  }

  // 3. Seed Doctors
  let doctors = getDB(DB_KEYS.DOCTORS);
  if (!doctors || doctors.length === 0) {
    doctors = [
      {
        doctorId: "doc001",
        doctorName: "Dr. Ravi Kumar",
        email: "ravi@hospital.com",
        phone: "111-222-3333",
        department: "General Medicine",
        specialization: "Family Medicine",
        qualification: "MBBS, MD",
        experience: "12",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        availableTime: "09:00 AM - 01:00 PM",
        status: "Available"
      },
      {
        doctorId: "doc002",
        doctorName: "Dr. Priya Sharma",
        email: "priya@hospital.com",
        phone: "222-333-4444",
        department: "Dental",
        specialization: "Orthodontics",
        qualification: "BDS, MDS",
        experience: "8",
        availableDays: ["Monday", "Wednesday", "Friday"],
        availableTime: "10:00 AM - 02:00 PM",
        status: "Available"
      },
      {
        doctorId: "doc003",
        doctorName: "Dr. Arun Raj",
        email: "arun@hospital.com",
        phone: "333-444-5555",
        department: "Cardiology",
        specialization: "Interventional Cardiology",
        qualification: "MBBS, MD, DM",
        experience: "15",
        availableDays: ["Tuesday", "Thursday", "Saturday"],
        availableTime: "04:00 PM - 08:00 PM",
        status: "Available"
      },
      {
        doctorId: "doc004",
        doctorName: "Dr. Meena Thomas",
        email: "meena@hospital.com",
        phone: "444-555-6666",
        department: "Pediatrics",
        specialization: "Child Health",
        qualification: "MBBS, DCH, MD",
        experience: "10",
        availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
        availableTime: "11:00 AM - 03:00 PM",
        status: "Available"
      }
    ];
    setDB(DB_KEYS.DOCTORS, doctors);
  }

  // 4. Seed Schedules
  let schedules = getDB(DB_KEYS.SCHEDULES);
  if (!schedules || schedules.length === 0) {
    schedules = [
      {
        scheduleId: "sch001",
        doctorId: "doc001",
        doctorName: "Dr. Ravi Kumar",
        department: "General Medicine",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        startTime: "09:00",
        endTime: "13:00",
        slotDuration: 30,
        status: "Active"
      },
      {
        scheduleId: "sch002",
        doctorId: "doc002",
        doctorName: "Dr. Priya Sharma",
        department: "Dental",
        availableDays: ["Monday", "Wednesday", "Friday"],
        startTime: "10:00",
        endTime: "14:00",
        slotDuration: 30,
        status: "Active"
      },
      {
        scheduleId: "sch003",
        doctorId: "doc003",
        doctorName: "Dr. Arun Raj",
        department: "Cardiology",
        availableDays: ["Tuesday", "Thursday", "Saturday"],
        startTime: "16:00",
        endTime: "20:00",
        slotDuration: 30,
        status: "Active"
      },
      {
        scheduleId: "sch004",
        doctorId: "doc004",
        doctorName: "Dr. Meena Thomas",
        department: "Pediatrics",
        availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
        startTime: "11:00",
        endTime: "15:00",
        slotDuration: 30,
        status: "Active"
      }
    ];
    setDB(DB_KEYS.SCHEDULES, schedules);
  }

  // 5. Seed Appointments
  let appointments = getDB(DB_KEYS.APPOINTMENTS);
  if (!appointments || appointments.length === 0) {
    const today = new Date().toISOString().split('T')[0];
    appointments = [
      {
        appointmentId: "apt001",
        patientId: "pat001",
        patientName: "Alex Johnson",
        doctorId: "doc001",
        doctorName: "Dr. Ravi Kumar",
        department: "General Medicine",
        appointmentDate: today,
        timeSlot: "09:30 AM",
        reasonForVisit: "Regular checkup and slight throat irritation.",
        status: "Confirmed"
      },
      {
        appointmentId: "apt002",
        patientId: "pat002",
        patientName: "Jane Doe",
        doctorId: "doc002",
        doctorName: "Dr. Priya Sharma",
        department: "Dental",
        appointmentDate: today,
        timeSlot: "10:30 AM",
        reasonForVisit: "Routine dental cleaning and whitening check.",
        status: "Pending"
      }
    ];
    setDB(DB_KEYS.APPOINTMENTS, appointments);
  }
};
