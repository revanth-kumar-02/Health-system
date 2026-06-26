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
      // Sample Doctor Users for Logins
      { id: "doc001", name: "Dr. Ravi Kumar", email: "ravi@hospital.com", role: "doctor", password: "doctor123", phone: "111-222-3333" },
      { id: "doc_gen_sarah", name: "Dr. Sarah Jenkins", email: "sarah.j@hospital.com", role: "doctor", password: "doctor123", phone: "555-0201" },
      { id: "doc_gen_mark", name: "Dr. Mark Adams", email: "mark.a@hospital.com", role: "doctor", password: "doctor123", phone: "555-0202" },
      { id: "doc_gen_lisa", name: "Dr. Lisa Cooper", email: "lisa.c@hospital.com", role: "doctor", password: "doctor123", phone: "555-0203" },
      
      { id: "doc003", name: "Dr. Arun Raj", email: "arun@hospital.com", role: "doctor", password: "doctor123", phone: "333-444-5555" },
      { id: "doc_card_elena", name: "Dr. Elena Rostova", email: "elena.r@hospital.com", role: "doctor", password: "doctor123", phone: "555-0204" },
      { id: "doc_card_james", name: "Dr. James Carter", email: "james.c@hospital.com", role: "doctor", password: "doctor123", phone: "555-0205" },
      { id: "doc_card_anita", name: "Dr. Anita Desai", email: "anita.d@hospital.com", role: "doctor", password: "doctor123", phone: "555-0206" },

      { id: "doc002", name: "Dr. Priya Sharma", email: "priya@hospital.com", role: "doctor", password: "doctor123", phone: "222-333-4444" },
      { id: "doc_dent_david", name: "Dr. David Miller", email: "david.m@hospital.com", role: "doctor", password: "doctor123", phone: "555-0207" },
      { id: "doc_dent_rachel", name: "Dr. Rachel Green", email: "rachel.g@hospital.com", role: "doctor", password: "doctor123", phone: "555-0208" },

      { id: "doc_ortho_vijay", name: "Dr. Vijay Patel", email: "vijay.p@hospital.com", role: "doctor", password: "doctor123", phone: "555-0209" },
      { id: "doc_ortho_susan", name: "Dr. Susan Vance", email: "susan.v@hospital.com", role: "doctor", password: "doctor123", phone: "555-0210" },
      { id: "doc_ortho_robert", name: "Dr. Robert Chen", email: "robert.c@hospital.com", role: "doctor", password: "doctor123", phone: "555-0211" },

      { id: "doc004", name: "Dr. Meena Thomas", email: "meena@hospital.com", role: "doctor", password: "doctor123", phone: "444-555-6666" },
      { id: "doc_ped_kevin", name: "Dr. Kevin Parker", email: "kevin.p@hospital.com", role: "doctor", password: "doctor123", phone: "555-0212" },
      { id: "doc_ped_clara", name: "Dr. Clara Oswald", email: "clara.o@hospital.com", role: "doctor", password: "doctor123", phone: "555-0213" },

      { id: "doc_ent_thomas", name: "Dr. Thomas Shelby", email: "thomas.s@hospital.com", role: "doctor", password: "doctor123", phone: "555-0214" },
      { id: "doc_ent_arthur", name: "Dr. Arthur Dent", email: "arthur.d@hospital.com", role: "doctor", password: "doctor123", phone: "555-0215" },
      { id: "doc_ent_donna", name: "Dr. Donna Noble", email: "donna.n@hospital.com", role: "doctor", password: "doctor123", phone: "555-0216" },

      { id: "doc_derm_jessica", name: "Dr. Jessica Jones", email: "jessica.j@hospital.com", role: "doctor", password: "doctor123", phone: "555-0217" },
      { id: "doc_derm_bruce", name: "Dr. Bruce Banner", email: "bruce.b@hospital.com", role: "doctor", password: "doctor123", phone: "555-0218" },
      { id: "doc_derm_selina", name: "Dr. Selina Kyle", email: "selina.k@hospital.com", role: "doctor", password: "doctor123", phone: "555-0219" }
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
      // 1. General Medicine (4 doctors)
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
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_gen_sarah",
        doctorName: "Dr. Sarah Jenkins",
        email: "sarah.j@hospital.com",
        phone: "555-0201",
        department: "General Medicine",
        specialization: "Internal Medicine",
        qualification: "MD",
        experience: "10",
        availableDays: ["Monday", "Wednesday", "Friday"],
        availableTime: "10:00 AM - 02:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_gen_mark",
        doctorName: "Dr. Mark Adams",
        email: "mark.a@hospital.com",
        phone: "555-0202",
        department: "General Medicine",
        specialization: "General Physician",
        qualification: "MBBS, MD",
        experience: "15",
        availableDays: ["Tuesday", "Thursday"],
        availableTime: "02:00 PM - 06:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_gen_lisa",
        doctorName: "Dr. Lisa Cooper",
        email: "lisa.c@hospital.com",
        phone: "555-0203",
        department: "General Medicine",
        specialization: "Primary Care Specialist",
        qualification: "MBBS",
        experience: "8",
        availableDays: ["Monday", "Tuesday", "Thursday"],
        availableTime: "09:00 AM - 01:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-162290204747a-757c9823b485?auto=format&fit=crop&q=80&w=250&h=250"
      },

      // 2. Cardiology (4 doctors)
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
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_card_elena",
        doctorName: "Dr. Elena Rostova",
        email: "elena.r@hospital.com",
        phone: "555-0204",
        department: "Cardiology",
        specialization: "Heart Failure Specialist",
        qualification: "MD, FACC",
        experience: "18",
        availableDays: ["Monday", "Wednesday"],
        availableTime: "09:00 AM - 01:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_card_james",
        doctorName: "Dr. James Carter",
        email: "james.c@hospital.com",
        phone: "555-0205",
        department: "Cardiology",
        specialization: "Cardiovascular Disease",
        qualification: "MD",
        experience: "12",
        availableDays: ["Tuesday", "Thursday"],
        availableTime: "01:00 PM - 05:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1623854767648-e7bb8c690e1e?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_card_anita",
        doctorName: "Dr. Anita Desai",
        email: "anita.d@hospital.com",
        phone: "555-0206",
        department: "Cardiology",
        specialization: "Pediatric Cardiology",
        qualification: "MD, DNB",
        experience: "14",
        availableDays: ["Wednesday", "Friday"],
        availableTime: "02:00 PM - 06:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1622902048128-40bcfec4668b?auto=format&fit=crop&q=80&w=250&h=250"
      },

      // 3. Dental (3 doctors)
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
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_dent_david",
        doctorName: "Dr. David Miller",
        email: "david.m@hospital.com",
        phone: "555-0207",
        department: "Dental",
        specialization: "Periodontist",
        qualification: "DDS",
        experience: "11",
        availableDays: ["Tuesday", "Thursday", "Friday"],
        availableTime: "10:00 AM - 02:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_dent_rachel",
        doctorName: "Dr. Rachel Green",
        email: "rachel.g@hospital.com",
        phone: "555-0208",
        department: "Dental",
        specialization: "Endodontist",
        qualification: "BDS, MDS",
        experience: "9",
        availableDays: ["Monday", "Wednesday"],
        availableTime: "01:00 PM - 05:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1625498542602-6be084199bef?auto=format&fit=crop&q=80&w=250&h=250"
      },

      // 4. Orthopedic (3 doctors)
      {
        doctorId: "doc_ortho_vijay",
        doctorName: "Dr. Vijay Patel",
        email: "vijay.p@hospital.com",
        phone: "555-0209",
        department: "Orthopedic",
        specialization: "Joint Replacement Specialist",
        qualification: "MS (Ortho)",
        experience: "16",
        availableDays: ["Monday", "Wednesday", "Friday"],
        availableTime: "09:00 AM - 01:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_ortho_susan",
        doctorName: "Dr. Susan Vance",
        email: "susan.v@hospital.com",
        phone: "555-0210",
        department: "Orthopedic",
        specialization: "Sports Medicine Specialist",
        qualification: "MD",
        experience: "11",
        availableDays: ["Tuesday", "Thursday"],
        availableTime: "11:00 AM - 03:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_ortho_robert",
        doctorName: "Dr. Robert Chen",
        email: "robert.c@hospital.com",
        phone: "555-0211",
        department: "Orthopedic",
        specialization: "Spine Surgeon",
        qualification: "MBBS, MS",
        experience: "20",
        availableDays: ["Monday", "Thursday"],
        availableTime: "04:00 PM - 08:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=250&h=250"
      },

      // 5. Pediatrics (3 doctors)
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
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_ped_kevin",
        doctorName: "Dr. Kevin Parker",
        email: "kevin.p@hospital.com",
        phone: "555-0212",
        department: "Pediatrics",
        specialization: "General Pediatrics",
        qualification: "MD, FAAP",
        experience: "13",
        availableDays: ["Tuesday", "Thursday", "Friday"],
        availableTime: "09:00 AM - 01:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_ped_clara",
        doctorName: "Dr. Clara Oswald",
        email: "clara.o@hospital.com",
        phone: "555-0213",
        department: "Pediatrics",
        specialization: "Neonatology",
        qualification: "MBBS, MD",
        experience: "7",
        availableDays: ["Monday", "Wednesday"],
        availableTime: "11:00 AM - 03:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=250&h=250"
      },

      // 6. ENT (3 doctors)
      {
        doctorId: "doc_ent_thomas",
        doctorName: "Dr. Thomas Shelby",
        email: "thomas.s@hospital.com",
        phone: "555-0214",
        department: "ENT",
        specialization: "Otolaryngologist",
        qualification: "MS (ENT)",
        experience: "14",
        availableDays: ["Monday", "Tuesday", "Wednesday"],
        availableTime: "10:00 AM - 02:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_ent_arthur",
        doctorName: "Dr. Arthur Dent",
        email: "arthur.d@hospital.com",
        phone: "555-0215",
        department: "ENT",
        specialization: "Rhinologist",
        qualification: "MBBS, MS",
        experience: "10",
        availableDays: ["Thursday", "Friday"],
        availableTime: "01:00 PM - 05:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1623854767648-e7bb8c690e1e?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_ent_donna",
        doctorName: "Dr. Donna Noble",
        email: "donna.n@hospital.com",
        phone: "555-0216",
        department: "ENT",
        specialization: "Audiologist Specialist",
        qualification: "MS",
        experience: "12",
        availableDays: ["Tuesday", "Thursday"],
        availableTime: "09:00 AM - 01:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-162290204747a-757c9823b485?auto=format&fit=crop&q=80&w=250&h=250"
      },

      // 7. Dermatology (3 doctors)
      {
        doctorId: "doc_derm_jessica",
        doctorName: "Dr. Jessica Jones",
        email: "jessica.j@hospital.com",
        phone: "555-0217",
        department: "Dermatology",
        specialization: "Cosmetic Dermatology",
        qualification: "MD",
        experience: "12",
        availableDays: ["Monday", "Wednesday", "Friday"],
        availableTime: "02:00 PM - 06:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_derm_bruce",
        doctorName: "Dr. Bruce Banner",
        email: "bruce.b@hospital.com",
        phone: "555-0218",
        department: "Dermatology",
        specialization: "Medical Dermatology",
        qualification: "MD, PhD",
        experience: "15",
        availableDays: ["Tuesday", "Thursday"],
        availableTime: "09:00 AM - 01:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250&h=250"
      },
      {
        doctorId: "doc_derm_selina",
        doctorName: "Dr. Selina Kyle",
        email: "selina.k@hospital.com",
        phone: "555-0219",
        department: "Dermatology",
        specialization: "Trichologist Specialist",
        qualification: "MBBS, DDVL",
        experience: "9",
        availableDays: ["Wednesday", "Friday"],
        availableTime: "11:00 AM - 03:00 PM",
        status: "Available",
        avatarUrl: "https://images.unsplash.com/photo-1622902048128-40bcfec4668b?auto=format&fit=crop&q=80&w=250&h=250"
      }
    ];
    setDB(DB_KEYS.DOCTORS, doctors);
  }

  // 4. Seed Schedules
  let schedules = getDB(DB_KEYS.SCHEDULES);
  if (!schedules || schedules.length === 0) {
    schedules = [
      // General Medicine
      { scheduleId: "sch001", doctorId: "doc001", doctorName: "Dr. Ravi Kumar", department: "General Medicine", availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], startTime: "09:00", endTime: "13:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_gen_sarah", doctorId: "doc_gen_sarah", doctorName: "Dr. Sarah Jenkins", department: "General Medicine", availableDays: ["Monday", "Wednesday", "Friday"], startTime: "10:00", endTime: "14:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_gen_mark", doctorId: "doc_gen_mark", doctorName: "Dr. Mark Adams", department: "General Medicine", availableDays: ["Tuesday", "Thursday"], startTime: "14:00", endTime: "18:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_gen_lisa", doctorId: "doc_gen_lisa", doctorName: "Dr. Lisa Cooper", department: "General Medicine", availableDays: ["Monday", "Tuesday", "Thursday"], startTime: "09:00", endTime: "13:00", slotDuration: 30, status: "Active" },

      // Cardiology
      { scheduleId: "sch003", doctorId: "doc003", doctorName: "Dr. Arun Raj", department: "Cardiology", availableDays: ["Tuesday", "Thursday", "Saturday"], startTime: "16:00", endTime: "20:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_card_elena", doctorId: "doc_card_elena", doctorName: "Dr. Elena Rostova", department: "Cardiology", availableDays: ["Monday", "Wednesday"], startTime: "09:00", endTime: "13:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_card_james", doctorId: "doc_card_james", doctorName: "Dr. James Carter", department: "Cardiology", availableDays: ["Tuesday", "Thursday"], startTime: "13:00", endTime: "17:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_card_anita", doctorId: "doc_card_anita", doctorName: "Dr. Anita Desai", department: "Cardiology", availableDays: ["Wednesday", "Friday"], startTime: "14:00", endTime: "18:00", slotDuration: 30, status: "Active" },

      // Dental
      { scheduleId: "sch002", doctorId: "doc002", doctorName: "Dr. Priya Sharma", department: "Dental", availableDays: ["Monday", "Wednesday", "Friday"], startTime: "10:00", endTime: "14:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_dent_david", doctorId: "doc_dent_david", doctorName: "Dr. David Miller", department: "Dental", availableDays: ["Tuesday", "Thursday", "Friday"], startTime: "10:00", endTime: "14:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_dent_rachel", doctorId: "doc_dent_rachel", doctorName: "Dr. Rachel Green", department: "Dental", availableDays: ["Monday", "Wednesday"], startTime: "13:00", endTime: "17:00", slotDuration: 30, status: "Active" },

      // Orthopedic
      { scheduleId: "sch_ortho_vijay", doctorId: "doc_ortho_vijay", doctorName: "Dr. Vijay Patel", department: "Orthopedic", availableDays: ["Monday", "Wednesday", "Friday"], startTime: "09:00", endTime: "13:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_ortho_susan", doctorId: "doc_ortho_susan", doctorName: "Dr. Susan Vance", department: "Orthopedic", availableDays: ["Tuesday", "Thursday"], startTime: "11:00", endTime: "15:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_ortho_robert", doctorId: "doc_ortho_robert", doctorName: "Dr. Robert Chen", department: "Orthopedic", availableDays: ["Monday", "Thursday"], startTime: "16:00", endTime: "20:00", slotDuration: 30, status: "Active" },

      // Pediatrics
      { scheduleId: "sch004", doctorId: "doc004", doctorName: "Dr. Meena Thomas", department: "Pediatrics", availableDays: ["Monday", "Tuesday", "Thursday", "Friday"], startTime: "11:00", endTime: "15:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_ped_kevin", doctorId: "doc_ped_kevin", doctorName: "Dr. Kevin Parker", department: "Pediatrics", availableDays: ["Tuesday", "Thursday", "Friday"], startTime: "09:00", endTime: "13:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_ped_clara", doctorId: "doc_ped_clara", doctorName: "Dr. Clara Oswald", department: "Pediatrics", availableDays: ["Monday", "Wednesday"], startTime: "11:00", endTime: "15:00", slotDuration: 30, status: "Active" },

      // ENT
      { scheduleId: "sch_ent_thomas", doctorId: "doc_ent_thomas", doctorName: "Dr. Thomas Shelby", department: "ENT", availableDays: ["Monday", "Tuesday", "Wednesday"], startTime: "10:00", endTime: "14:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_ent_arthur", doctorId: "doc_ent_arthur", doctorName: "Dr. Arthur Dent", department: "ENT", availableDays: ["Thursday", "Friday"], startTime: "13:00", endTime: "17:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_ent_donna", doctorId: "doc_ent_donna", doctorName: "Dr. Donna Noble", department: "ENT", availableDays: ["Tuesday", "Thursday"], startTime: "09:00", endTime: "13:00", slotDuration: 30, status: "Active" },

      // Dermatology
      { scheduleId: "sch_derm_jessica", doctorId: "doc_derm_jessica", doctorName: "Dr. Jessica Jones", department: "Dermatology", availableDays: ["Monday", "Wednesday", "Friday"], startTime: "14:00", endTime: "18:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_derm_bruce", doctorId: "doc_derm_bruce", doctorName: "Dr. Bruce Banner", department: "Dermatology", availableDays: ["Tuesday", "Thursday"], startTime: "09:00", endTime: "13:00", slotDuration: 30, status: "Active" },
      { scheduleId: "sch_derm_selina", doctorId: "doc_derm_selina", doctorName: "Dr. Selina Kyle", department: "Dermatology", availableDays: ["Wednesday", "Friday"], startTime: "11:00", endTime: "15:00", slotDuration: 30, status: "Active" }
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
