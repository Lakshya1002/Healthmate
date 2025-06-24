// src/components/MedicineList.jsx

import React, { useEffect, useState } from "react";
import API from "../api";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    dosage: "",
    method: "pill",
    start_date: "",
    end_date: "",
    notes: "",
  });

  const fetchMedicines = async () => {
    try {
      const res = await API.get("/medicines");
      setMedicines(res.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/medicines/${id}`);
      alert("🗑️ Medicine deleted");
      fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const startEditing = (med) => {
    setEditingId(med.medicine_id);
    setEditForm({
      name: med.name,
      dosage: med.dosage,
      method: med.method,
      start_date: med.start_date?.slice(0, 10),
      end_date: med.end_date?.slice(0, 10),
      notes: med.notes,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      dosage: "",
      method: "pill",
      start_date: "",
      end_date: "",
      notes: "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/medicines/${editingId}`, editForm);
      alert("✅ Medicine updated successfully!");
      cancelEdit();
      fetchMedicines();
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  return (
    <div>
      <h2>📋 Your Medicines</h2>
      {medicines.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <ul>
          {medicines.map((med) => (
            <li key={med.medicine_id}>
              {editingId === med.medicine_id ? (
                <div>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Medicine name"
                  />
                  <input
                    name="dosage"
                    value={editForm.dosage}
                    onChange={handleEditChange}
                    placeholder="Dosage"
                  />
                  <select
                    name="method"
                    value={editForm.method}
                    onChange={handleEditChange}
                  >
                    <option value="pill">Pill</option>
                    <option value="syrup">Syrup</option>
                    <option value="tablet">Tablet</option>
                    <option value="injection">Injection</option>
                  </select>
                  <input
                    name="start_date"
                    type="date"
                    value={editForm.start_date}
                    onChange={handleEditChange}
                  />
                  <input
                    name="end_date"
                    type="date"
                    value={editForm.end_date}
                    onChange={handleEditChange}
                  />
                  <textarea
                    name="notes"
                    value={editForm.notes}
                    onChange={handleEditChange}
                    placeholder="Notes"
                  />
                  <br />
                  <button onClick={handleUpdate}>💾 Save</button>
                  <button onClick={cancelEdit}>❌ Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{med.name}</strong> ({med.dosage}) - {med.method} <br />
                  📆 {med.start_date?.slice(0, 10)} to {med.end_date?.slice(0, 10)} <br />
                  📝 {med.notes}
                  <br />
                  <button onClick={() => startEditing(med)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(med.medicine_id)}>🗑️ Delete</button>
                  <hr />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MedicineList;
