import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Checkout.css";

function CheckoutProcessing() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("processing");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage("success");
    }, 3000);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (stage === "success") {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [stage, navigate]);

  return (
    <div className="checkout-page">
      {stage === "processing" && (
        <h1 className="checkout-text">Payment Processing...</h1>
      )}

      {stage === "success" && (
        <h1 className="checkout-text">
          Payment Successful! <br />
          Returning to home in {countdown}...
        </h1>
      )}
    </div>
  );
}

export default CheckoutProcessing;
