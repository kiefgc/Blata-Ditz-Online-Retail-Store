import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Information from "./Information";
import Payment from "./Payment";

export default function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    street: "",
    postal: "",
    city: "",
    region: "",
  });

  const handleContinue = () => {
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    if (!allFilled) {
      alert("Please fill out all fields before continuing.");
      return;
    }
    navigate("/checkout/payment");
  };

  return (
    <Routes>
      <Route
        index
        element={
          <Information
            formData={formData}
            setFormData={setFormData}
            handleContinue={handleContinue}
          />
        }
      />
      <Route path="payment" element={<Payment formData={formData} />} />
    </Routes>
  );
}
