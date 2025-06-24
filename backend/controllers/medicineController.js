const db = require("../config/db");

const addMedicine = (req, res) => {
  const { name, dosage, method, start_date, end_date, notes } = req.body;

  const sql = `
    INSERT INTO medicines (name, dosage, method, start_date, end_date, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, dosage, method, start_date, end_date, notes], (err, result) => {
    if (err) {
      console.error("❌ Error adding medicine:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "✅ Medicine added successfully!" });
  });
};

module.exports = { addMedicine };


const getAllMedicines = (req, res) => {
  const sql = "SELECT * FROM medicines ORDER BY medicine_id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching medicines:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results); // return all rows
  });
};

module.exports = {
  addMedicine,
  getAllMedicines
};

const deleteMedicine = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM medicines WHERE medicine_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting medicine:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ message: "✅ Medicine deleted successfully" });
  });
};
module.exports = {
  addMedicine,
  getAllMedicines,
  deleteMedicine
};


const updateMedicine = (req, res) => {
  const id = req.params.id;
  const { name, dosage, method, start_date, end_date, notes } = req.body;

  const sql = `
    UPDATE medicines 
    SET name = ?, dosage = ?, method = ?, start_date = ?, end_date = ?, notes = ?
    WHERE medicine_id = ?
  `;

  const values = [name, dosage, method, start_date, end_date, notes, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error updating medicine:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Medicine not found" });
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
