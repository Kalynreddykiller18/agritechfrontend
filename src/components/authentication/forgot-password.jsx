import axios from "axios";
import React, { useState, useRef } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const mailRef = useRef();
  const [mes, setMes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setMes("");
      const res = await axios.post(`${apiUrl}customer/forgotpassword`, {
        mail: mailRef.current.value,
      });

      if (res.status === 200) {
        setMes("Password reset mail sent, please check");
      } else if (res.status === 404) {
        setMes(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        setMes(err.response.data.message);
      } else {
        setMes("An Error occured");
      }
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      <h1> Forgot Password</h1>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="email"
          ref={mailRef}
          name="email"
          placeholder="Enter your E-mail"
          required
        />
        <input disabled={loading} type="submit" value="SEND MAIL" />
      </form>
      {mes ? mes : ""}
    </div>
  );
};

export default ForgotPassword;
