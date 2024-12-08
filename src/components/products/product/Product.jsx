import React, { useContext, useState } from "react";
import "./product.css";
import axios from "axios";
import { AgriContext } from "../../../context/AgriContext";

const Product = ({ item }) => {
  const { logged, cart, user, fetchCart } = useContext(AgriContext);
  const [alert, setAlert] = useState(false);

  const addToCart = async () => {
    try {
      if (!logged) return alert("Please login first");

      const data = await axios.post("http://localhost:3000/api/cart/add", {
        product_id: item.id,
        customer_id: user.id,
      });

      fetchCart();
      createCartAlert();
    } catch (err) {
      console.log(err.message);
    }
  };

  const createCartAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 500);
  };

  return (
    <div className="card">
      <img className="card-img" src={item.image} alt="Product" />
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <h4 className="card-subtitle">{item.category}</h4>

        <p className="card-description">{item.description}</p>
        <div className="card-footer">
          <h4 className="card-price">${item.price}</h4>
          <button disabled={alert} className="card-button" onClick={addToCart}>
            <img className="button-icon" src="Cart.svg" alt="Cart" />
            {alert ? "Added..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
