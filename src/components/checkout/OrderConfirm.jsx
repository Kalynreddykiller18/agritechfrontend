import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { data, useLocation } from "react-router-dom";
import { AgriContext } from "../../context/AgriContext";
const apiUrl = import.meta.env.VITE_API_URL;

const OrderConfirm = () => {
  const { products } = useContext(AgriContext);
  const [data, setData] = useState([]);

  const location = useLocation();
  const order_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchOrderedItem = async () => {
      try {
        const data = await axios.get(`${apiUrl}orders/${order_id}`);
        setData(data.data);
      } catch (err) {
        console.log("Error in orders getting: ", err.message);
      }
    };
    fetchOrderedItem();
  }, []);

  return (
    <div className="orderpage">
      Order Confirmation
      <h5>Your order is confirmed with Order ID: {order_id}</h5>
      <div className="ordered-items">
        {data.map((item) => {
          const cartproduct = products.find(
            (item2) => item.product_id === item2.id
          );

          if (!cartproduct) {
            console.warn(`Product not found for cart item: ${item.product_id}`);
            return null; // Skip rendering this item
          }
          return (
            <CartCard
              key={item.product_id}
              item={item}
              cartitem={cartproduct}
            />
          );
        })}
      </div>
      <br />
      <div className="ordered-address">
        <b style={{ paddingBottom: "20px" }}>Address:</b>
        <br /> {data[0]?.address}
      </div>
      <h4>Further Order updates will be shared over mail and mobile</h4>
    </div>
  );
};

const CartCard = ({ item, cartitem, user, fetchCart }) => {
  return (
    <div className="cartcard">
      <img className="card-img" src={cartitem.image} alt="Product" />
      <div className="card-content">
        <h3 className="card-title">{cartitem.name}</h3>
        <h4 className="card-subtitle">{cartitem.category}</h4>
        <div className="card-footer">
          <span className="card-price">₹{cartitem.price * item.quantity} </span>
          <span>{item.quantity}</span>
        </div>
        <p>{item.status}</p>
      </div>
    </div>
  );
};

export default OrderConfirm;
