// controllers/searchController.js
const SearchModel = require("../models/searchModel");

exports.search = async (req, res) => {
  const searchTerm = req.query.q?.trim() || "";
  const type = req.query.type?.trim() || "all";
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    if (type === "character") {
      SearchModel.getCharacterCertificates(
        searchTerm,
        limit,
        offset,
        (err, result) => {
          if (err) return res.status(500).json({ error: "Search failed" });
          res.json(result);
        }
      );
    } else if (type === "birth") {
      SearchModel.getBirthCertificates(
        searchTerm,
        limit,
        offset,
        (err, result) => {
          if (err) return res.status(500).json({ error: "Search failed" });
          res.json(result);
        }
      );
    } else {
      // Fetch both types and return them in a single array
      SearchModel.getBothCertificates(
        searchTerm,
        limit,
        offset,
        (err, results) => {
          if (err) return res.status(500).json({ error: "Search failed" });
          res.json(results); // Return combined results
        }
      );
    }
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

// const SearchModel = require("../models/searchModel");

// exports.search = (req, res) => {
//   const searchTerm = req.query.q || "";
//   const type = req.query.type || "all"; // dynamic
//   const limit = parseInt(req.query.limit) || 10;
//   const offset = parseInt(req.query.offset) || 0;

//   SearchModel.searchCertificates(
//     searchTerm,
//     type,
//     limit,
//     offset,
//     (err, results) => {
//       if (err) {
//         console.error("Search error:", err);
//         return res.status(500).json({ error: "Search failed" });
//       }
//       res.status(200).json(results);
//     }
//   );
// };
