// src/components/MedicineForm.jsx

import React, { useState } from "react";
import API from "../api";

function MedicineForm() {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    method: "pill",
    start_date: "",
    end_date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/medicines", formData);
      alert("✅ Medicine added successfully!");
      setFormData({
        name: "",
        dosage: "",
        method: "pill",
        start_date: "",
        end_date: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("❌ Failed to add medicine");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Add New Medicine</h2>
      <input
        type="text"
        name="name"
        placeholder="Medicine Name"
        value={formData.name}
        onChange={handleChange}
        required
      /><br /><br />

      <input
        type="text"
        name="dosage"
        placeholder="Dosage (e.g., 500mg)"
        value={formData.dosage}
        onChange={handleChange}
      /><br /><br />

      <select name="method" value={formData.method} onChange={handleChange}>
        <option value="pill">Pill</option>
        <option value="syrup">Syrup</option>
        <option value="tablet">Tablet</option>
        <option value="injection">Injection</option>
      </select><br /><br />

      <label>Start Date: </label>
      <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
      /><br /><br />

      <label>End Date: </label>
      <input
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
      /><br /><br />

      <textarea
        name="notes"
        placeholder="Notes (e.g., after food)"
        value={formData.notes}
        onChange={handleChange}
      /><br /><br />

      <button type="submit">➕ Add Medicine</button>
    </form>
  );
}

export default MedicineForm;
