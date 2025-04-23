const db = require("./config/db.js");

const createBirthCertificateTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS birthCertificate (
      id INT PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(255),
      father_name VARCHAR(255),
      mother_name VARCHAR(255),
      dob DATE,
      gender VARCHAR(50),
      address TEXT,
      admission_number VARCHAR(100),
      class VARCHAR(50),
      section VARCHAR(50),
      roll_number VARCHAR(100),
      academic_year VARCHAR(100),
      date_of_issue DATE,

      type VARCHAR(25) NOT NULL,
      created_by INT NOT NULL,
      created_by_email VARCHAR(50),
      school_name VARCHAR(250),
      school_location VARCHAR(250),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(query, (err) => {
    if (err) {
      console.error("Error creating birthCertificate table:", err);
    } else {
      console.log("birthCertificate table ensured.");
    }
  });
};

const createCharacterCertificateTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS characterCertificate (
      id INT PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(255),
      father_name VARCHAR(255),
      mother_name VARCHAR(255),
      dob DATE,
      gender VARCHAR(50),
      address TEXT,
      admission_number VARCHAR(100),
      class VARCHAR(50),
      section VARCHAR(50),
      roll_number VARCHAR(100),
      academic_year VARCHAR(100),
    
      rr_no BIGINT NOT NULL,
      pen_no BIGINT NOT NULL,
      behavior TEXT,
      marks_obtained INT NOT NULL,
      total_marks INT NOT NULL,
      division VARCHAR(50),
      behavior_summary TEXT,
      date_of_issue DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      type VARCHAR(25),
      created_by INT NOT NULL,
      createdBy_email VARCHAR(50),
      school_name VARCHAR(250),
      school_location VARCHAR(250),
      
      INDEX idx_rr_no (rr_no),
      INDEX idx_pen_no (pen_no)
    )
  `;

  db.query(query, (err) => {
    if (err) {
      console.error("Error creating characterCertificate table:", err);
    } else {
      console.log("characterCertificate table ensured.");
    }
  });
};

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  db.query(query, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("users table ensured.");
    }
  });
};

module.exports = {
  createBirthCertificateTable,
  createCharacterCertificateTable,
  createUserTable,
};

// {
//   "id": 1,
//   "full_name": "John Doe",
//   "father_name": "Michael Doe",
//   "mother_name": "Sarah Doe",
//   "dob": "2010-05-14T18:30:00.000Z",
//   "gender": "Male",
//   "address": "123 Street, City",
//   "admission_number": "AD12345",
//   "class": "5",
//   "section": "A",
//   "roll_number": "23",
//   "academic_year": "2022-2023",
//   "date_of_issue": "2023-05-31T18:30:00.000Z",
//   "created_at": "2025-04-21T00:26:46.000Z"
// },
