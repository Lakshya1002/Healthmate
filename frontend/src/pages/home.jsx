import React from "react";
import MedicineForm from "../components/MedicineForm";
import MedicineList from "../components/MedicineList";

function Home() {
  return (
    <div>
      <MedicineForm />
      <hr />
      <MedicineList />
    </div>
  );
}

export default Home;
