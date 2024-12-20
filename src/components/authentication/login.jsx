import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AgriContext } from "../../context/AgriContext";
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const { setLogged, fetchUser, setUser } = useContext(AgriContext);

  const mailRef = useRef();
  const passRef = useRef();

  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErr("");
      setMes("");
      const credentials = {
        email: mailRef.current.value,
        password: passRef.current.value,
      };

      const data = await axios.post(`${apiUrl}customer/login`, credentials, {
        withCredentials: true,
      });

      if (data.status === 200) {
        setLogged(true);
        console.log("done", data.data);
        const userdata = await axios.get(`${apiUrl}customer/byjwt`, {
          withCredentials: true,
        });

        console.log("New Data", userdata.data);
        setUser(userdata.data);
        setMes("Logging In...");
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        setErr(err.response.data.message);
      } else {
        setErr("An Error occured");
        console.log(err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <h2>LOGIN</h2>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          name="mail"
          ref={mailRef}
          id="mail"
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          name="password"
          ref={passRef}
          id="password"
          placeholder="Password"
          required
        />
        <input disabled={loading} type="submit" value="LOGIN" />
      </form>
      <div className="belowlink">
        <Link to="/forgotpassword">Forgot password?</Link>
      </div>
      <div className="belowlink">
        Don't have an account, <Link to="/signup">Signup</Link>
      </div>
      <div className="mes">{mes ? mes : ""}</div>
      <div className="err">{err ? err : ""}</div>
    </div>
  );
};

export default Login;
