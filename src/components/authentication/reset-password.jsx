import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const passref = useRef();
  const conpassref = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [valid, setValid] = useState(false);
  const [mes, setMes] = useState("");
  const [linktoken, setLinktoken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkValidation = async () => {
      try {
        const token = location.pathname.split("/")[2];
        setLinktoken(token);
        const res = await axios.get(
          `${apiUrl}customer/resetpasswordvalidation/${token}`
        );

        if (res.status === 200) {
          setValid(true);
        } else {
          setValid(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    checkValidation();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setMes("");
      if (passref.current.value !== conpassref.current.value) {
        return setMes("Passwords not matched");
      }
      const res = await axios.post(
        `${apiUrl}customer/changepassword`,
        { password: passref.current.value },
        {
          headers: {
            token: linktoken,
          },
        }
      );

      if (res.status === 200) {
        setMes("Password updated, redirecting to Login page...");
        navigate("/login");
      } else {
        setMes("Unable to update password");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div>
      <h1>ResetPassword</h1>
      {valid ? (
        <form action="#" onSubmit={handleSubmit}>
          <input
            type="password"
            ref={passref}
            placeholder="Password"
            required
          />
          <input
            type="password"
            ref={conpassref}
            placeholder="Confirm Password"
            required
          />
          <input disabled={loading} type="submit" value="UPDATE PASSWORD" />
        </form>
      ) : (
        <h4>Your Link expired, please reset the password again</h4>
      )}
      <h3>{mes ? mes : ""}</h3>
    </div>
  );
};

export default ResetPassword;
