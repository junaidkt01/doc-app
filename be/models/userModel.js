const db = require("../config/db");

exports.createUser = (email, hashedPassword, callback) => {
  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    callback
  );
};

exports.findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};
