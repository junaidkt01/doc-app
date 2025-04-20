const db = require("../config/db");

exports.createCertificate = (data, callback) => {
  const sql = `INSERT INTO birthCertificate SET ?`;
  db.query(sql, data, callback);
};

exports.getAllCertificates = (callback) => {
  db.query("SELECT * FROM birthCertificate", callback);
};

exports.getCertificateById = (id, callback) => {
  db.query("SELECT * FROM birthCertificate WHERE id = ?", [id], callback);
};

exports.updateCertificate = (id, data, callback) => {
  db.query("UPDATE birthCertificate SET ? WHERE id = ?", [data, id], callback);
};

exports.deleteCertificate = (id, callback) => {
  db.query("DELETE FROM birthCertificate WHERE id = ?", [id], callback);
};
