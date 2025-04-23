const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (results?.length) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    User.createUser(email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "3d" }
    );

    res.status(200).json({ message: "Login successful", token });
  });
};
