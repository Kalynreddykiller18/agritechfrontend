import React, { useState } from "react";
import Summary from "./Summary";
import Address from "./Address";
import Payment from "./Payment";
import "./Checkout.css";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkoutAdress, setCheckoutAdress] = useState(null);
  const [selectAdressIndex, setSelectAdressIndex] = useState(null);

  const steps = ["Address", "Summary", "Payment"];

  return (
    <div className="checkout-container">
      <div className="step-status-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? "active" : ""} ${
              index < currentStep ? "completed" : ""
            }`}
            onClick={() => {
              if (currentStep === 0) {
                if (!checkoutAdress) {
                  alert("Select one address");
                  return;
                }
              }
              setCurrentStep(index);
            }}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="step-content">
        {currentStep === 0 && (
          <Address
            setCheckoutAdress={setCheckoutAdress}
            selectAdressIndex={selectAdressIndex}
            setSelectAdressIndex={setSelectAdressIndex}
          />
        )}
        {currentStep === 1 && <Summary checkoutAdress={checkoutAdress} />}
        {currentStep === 2 && <Payment />}
      </div>

      {/* Navigation Buttons */}
      <div className="step-navigation">
        {currentStep > 0 && (
          <button onClick={() => setCurrentStep((prev) => prev - 1)}>
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            onClick={() => {
              if (!checkoutAdress) {
                alert("Please select one address");
                return;
              }
              setCurrentStep((prev) => prev + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
