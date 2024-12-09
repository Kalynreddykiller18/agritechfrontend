// Navigation.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AgriContext } from "../context/AgriContext";
import "./Navigation.css";
import CartIcon from "./CartIcon";

const Navigation = () => {
  const { logged, setLogged } = useContext(AgriContext);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  return (
    <nav>
      <h2>Agritech</h2>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => setMenuOpen(!menuOpen)}>
          <Link to={"/"}>Dashboard</Link>
        </li>
        <li onClick={() => setMenuOpen(!menuOpen)}>
          <Link to={"/pecticides"}>Pecticides</Link>
        </li>
        <li onClick={() => setMenuOpen(!menuOpen)}>
          <Link to={"/fertilizers"}>Fertilizers</Link>
        </li>
        <li onClick={() => setMenuOpen(!menuOpen)}>
          <Link to={"/seeds"}>Seeds</Link>
        </li>
        {logged ? (
          <li onClick={() => setMenuOpen(!menuOpen)}>
            <Link onClick={() => setLogged(false)} to={"/login"}>
              Logout
            </Link>
          </li>
        ) : (
          <li onClick={() => setMenuOpen(!menuOpen)}>
            <Link to={"/login"}>Login</Link>
          </li>
        )}
        {logged && (
          <CartIcon
            onClick={() => setMenuOpen(!menuOpen)}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        )}
      </ul>
      <ul className="mobcart">
        {!menuOpen && logged && (
          <CartIcon menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        )}
      </ul>
      <button
        className={`menu-button ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
};

export default Navigation;
