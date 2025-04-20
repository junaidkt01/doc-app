const express = require("express");
const cors = require("cors");
const app = express();
const createBirthCertificateTable = require("./initDB");

app.use(cors());
app.use(express.json());

createBirthCertificateTable(); // create table if not exists

// Routes
const birthCertificateRoute = require("./routes/birthCertificateRoute");
app.use("/api/birth-certificates", birthCertificateRoute);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
