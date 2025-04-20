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

module.exports = createBirthCertificateTable;
