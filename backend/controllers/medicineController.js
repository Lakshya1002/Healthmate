const db = require("../config/db");
const toNull = (value) => (value === "" ? null : value);
const addMedicine = (req, res) => {
  const { name, dosage, method, start_date, end_date, notes } = req.body;

  const sql = `
    INSERT INTO medicines (name, dosage, method, start_date, end_date, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    dosage,
    method,
    toNull(start_date),
    toNull(end_date),
    notes,
    userId,
  ];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error adding medicine:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "✅ Medicine added successfully!" });
  });
};


const getAllMedicines = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT * FROM medicines 
    WHERE user_id = ? 
    ORDER BY medicine_id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching medicines:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

// ✅ Delete Medicine (only user's own)
const deleteMedicine = (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const sql = `
    DELETE FROM medicines 
    WHERE medicine_id = ? AND user_id = ?
  `;

  db.query(sql, [id, userId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting medicine:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Medicine not found or unauthorized" });
    }
    res.status(200).json({ message: "✅ Medicine deleted successfully" });
  });
};

module.exports = {
  addMedicine,
  getAllMedicines,
  deleteMedicine
};

// ✅ Update Medicine (only user's own)
const updateMedicine = (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { name, dosage, method, start_date, end_date, notes } = req.body;

  const sql = `
    UPDATE medicines 
    SET name = ?, dosage = ?, method = ?, start_date = ?, end_date = ?, notes = ?
    WHERE medicine_id = ? AND user_id = ?
  `;

  const values = [
    name,
    dosage,
    method,
    toNull(start_date),
    toNull(end_date),
    notes,
    id,
    userId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error updating medicine:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Medicine not found or unauthorized" });
    }
    res.status(200).json({ message: "✅ Medicine updated successfully" });
  });
};
module.exports = {
  addMedicine,
  getAllMedicines,
  deleteMedicine,
  updateMedicine
};
