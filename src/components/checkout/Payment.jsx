import React, { useContext, useState } from "react";
import { AgriContext } from "../../context/AgriContext";
const apiUrl = import.meta.env.VITE_API_URL;
const keyRazor = import.meta.env.VITE_RAZOR_KEY;

const Payment = () => {
  const { user, total } = useContext(AgriContext);
  const [message, setMessage] = useState();

  const handlePayment = async () => {
    try {
      // Fetch order ID from backend
      const response = await fetch(`${apiUrl}payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });
      const { orderId } = await response.json();

      const options = {
        key: keyRazor,
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "Agritech",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          console.log("Payment success:", response);

          // Send payment details to backend for verification
          const verifyResponse = await fetch(
            `${apiUrl}payment/verify-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const result = await verifyResponse.json();

          if (result.success) {
            alert("Payment Verified! Thank you for your purchase.");
            // Create order in backend
          } else {
            alert("Payment Verification Failed! Please contact support.");
          }
        },
        prefill: {
          name: user.firstname,
          email: user.email,
          contact: user.mobile,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error.description);
        setMessage("Payment failed:", response.error.description);
      });
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="payment">
      <h3>Payment Page</h3>
      <span>Your total is ₹{total}, please complete the payment</span> <br />
      <button onClick={handlePayment}>Pay Now</button>
      <div>{message && message}</div>
    </div>
  );
};

export default Payment;
