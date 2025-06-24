const express = require("express");
const router = express.Router();
const {
  addMedicine,
  getAllMedicines,
  deleteMedicine,
  updateMedicine
} = require("../controllers/medicineController");

router.post("/", addMedicine);
router.get("/", getAllMedicines);
router.delete("/:id", deleteMedicine);
router.put("/:id", updateMedicine);

module.exports = router;
