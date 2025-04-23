const db = require("../config/db");

exports.createCertificate = (data, callback) => {
  const sql = `INSERT INTO characterCertificate SET ?`;
  db.query(sql, data, callback);
};

exports.getAllCertificates = (callback) => {
  db.query("SELECT * FROM characterCertificate", callback);
};

exports.getCertificateById = (id, callback) => {
  db.query("SELECT * FROM characterCertificate WHERE id = ?", [id], callback);
};

exports.updateCertificate = (id, data, callback) => {
  db.query(
    "UPDATE characterCertificate SET ? WHERE id = ?",
    [data, id],
    callback
  );
};

exports.deleteCertificate = (id, callback) => {
  db.query("DELETE FROM characterCertificate WHERE id = ?", [id], callback);
};
