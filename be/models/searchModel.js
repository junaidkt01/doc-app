// models/searchModel.js

const db = require("../config/db");

exports.getCharacterCertificates = (search, limit, offset, cb) => {
  const likeQuery = `%${search}%`;
  const sql = `
    SELECT * FROM characterCertificate
    ${
      search
        ? "WHERE CONCAT_WS(' ', full_name, rr_no, behavior_summary) LIKE ?"
        : ""
    }
    ORDER BY date_of_issue DESC LIMIT ? OFFSET ?
  `;
  const params = search ? [likeQuery, limit, offset] : [limit, offset];
  db.query(sql, params, cb);
};

exports.getBirthCertificates = (search, limit, offset, cb) => {
  const likeQuery = `%${search}%`;
  const sql = `
    SELECT * FROM birthCertificate
    ${
      search
        ? "WHERE CONCAT_WS(' ', full_name, admission_number, father_name) LIKE ?"
        : ""
    }
    ORDER BY date_of_issue DESC LIMIT ? OFFSET ?
  `;
  const params = search ? [likeQuery, limit, offset] : [limit, offset];
  db.query(sql, params, cb);
};

exports.getBothCertificates = (search, limit, offset, cb) => {
  let results = [];

  // First, fetch character certificates
  exports.getCharacterCertificates(search, limit, offset, (err, chars) => {
    if (err) return cb(err);
    results = results.concat(chars); // Add character certificates to results

    // Then, fetch birth certificates
    exports.getBirthCertificates(search, limit, offset, (err2, births) => {
      if (err2) return cb(err2);
      results = results.concat(births); // Add birth certificates to results

      // Return the combined results in a single array
      cb(null, results);
    });
  });
};

///////////////////////////////////////////////////////////

// const searchCertificates = (searchTerm, type, limit, offset, callback) => {
//   const likeQuery = `%${searchTerm}%`;
//   const params = [];
//   let sql = "";

//   if (type === "character") {
//     sql = `
//       SELECT
//         'character' AS certificate_type,
//         id,
//         full_name,
//         rr_no AS identifier,
//         date_of_issue,
//         class,
//         behavior_summary AS details
//       FROM characterCertificate
//       WHERE CONCAT_WS(' ', full_name, rr_no, behavior_summary) LIKE ?
//     `;
//     params.push(likeQuery);
//   } else if (type === "birth") {
//     sql = `
//       SELECT
//         'birth' AS certificate_type,
//         id,
//         full_name,
//         admission_number AS identifier,
//         date_of_issue,
//         class,
//         CONCAT('Born: ', dob) AS details
//       FROM birthCertificate
//       WHERE CONCAT_WS(' ', full_name, admission_number, father_name) LIKE ?
//     `;
//     params.push(likeQuery);
//   } else {
//     // all types
//     sql = `
//       (
//         SELECT
//           'character' AS certificate_type,
//           id,
//           full_name,
//           rr_no AS identifier,
//           date_of_issue,
//           class,
//           behavior_summary AS details
//         FROM characterCertificate
//         WHERE CONCAT_WS(' ', full_name, rr_no, behavior_summary) LIKE ?
//       )
//       UNION ALL
//       (
//         SELECT
//           'birth' AS certificate_type,
//           id,
//           full_name,
//           admission_number AS identifier,
//           date_of_issue,
//           class,
//           CONCAT('Born: ', dob) AS details
//         FROM birthCertificate
//         WHERE CONCAT_WS(' ', full_name, admission_number, father_name) LIKE ?
//       )
//     `;
//     params.push(likeQuery, likeQuery);
//   }

//   // Final part: pagination
//   sql += ` ORDER BY date_of_issue DESC LIMIT ? OFFSET ?`;
//   params.push(limit, offset);

//   db.query(sql, params, callback);
// };

// module.exports = {
//   searchCertificates,
// };
