import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AgriContext } from "../context/AgriContext";

const CartIcon = ({ menuOpen, setMenuOpen }) => {
  const { cartno } = useContext(AgriContext);

  return (
    <li onClick={() => setMenuOpen(!menuOpen)}>
      <Link className="cartlink" to={"/cart"}>
        <img src="Cart.svg" alt="cart" />
        <div className="cartcount">{cartno}</div>
      </Link>
    </li>
  );
};

export default CartIcon;
