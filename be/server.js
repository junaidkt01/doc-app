const express = require("express");
const cors = require("cors");
const app = express();
const {
  createBirthCertificateTable,
  createCharacterCertificateTable,
  createUserTable,
} = require("./initDB");

app.use(cors());
app.use(express.json());

// create table if not exists
createBirthCertificateTable();
createCharacterCertificateTable();
createUserTable();

const authMiddleware = require("./middleware/authMiddleware");

// Routes
const birthCertificateRoute = require("./routes/birthCertificateRoute");
app.use("/api/birth-certificates", authMiddleware, birthCertificateRoute);

const characterCertificateRoute = require("./routes/characterCertificateRoute");
app.use(
  "/api/character-certificates",
  authMiddleware,
  characterCertificateRoute
);

const searchRoute = require("./routes/searchRoute");
app.use("/api/search", searchRoute);

const authRoute = require("./routes/authRoute");
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
