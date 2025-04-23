const model = require("../models/characterCertificate");

exports.create = (req, res) => {
  model.createCertificate(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "Certificate created", id: result.insertId });
  });
};

exports.getAll = (req, res) => {
  model.getAllCertificates((err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  model.getCertificateById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err });
    if (row.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(row[0]);
  });
};

exports.update = (req, res) => {
  model.updateCertificate(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Certificate updated" });
  });
};

exports.remove = (req, res) => {
  model.deleteCertificate(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Certificate deleted" });
  });
};
