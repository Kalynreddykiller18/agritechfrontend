import React, { useContext, useEffect, useState } from "react";
import { AgriContext } from "../context/AgriContext";
import axios from "axios";
import "./cart.css";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Cart = () => {
  const { products, logged, cart, fetchCart, user, total, setTotal } =
    useContext(AgriContext);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const cartproduct = products.find(
        (item2) => item.product_id === item2.id
      );
      return acc + (cartproduct?.price || 0) * item.count;
    }, 0);
    setTotal(total);
  }, [cart, products]);

  return (
    <div>
      {console.log(total)}
      {total === 0 ? (
        <h2 className="emptytext"> You are cart is empty</h2>
      ) : (
        <>
          <div className="products">
            {cart.map((item) => {
              console.log("CartItem: ", item);
              console.log("Products: ", products);
              const cartproduct = products.find(
                (item2) => item.product_id === item2.id
              );

              if (!cartproduct) {
                console.warn(
                  `Product not found for cart item: ${item.product_id}`
                );
                return null; // Skip rendering this item
              }
              return (
                <CartCard
                  key={cartproduct._id}
                  item={item}
                  cartitem={cartproduct}
                  user={user}
                  fetchCart={fetchCart}
                />
              );
            })}
          </div>
          <div className="cartfooter">
            <span>Total: {total}</span>
            <button
              onClick={() => handleEmptiengCart(user.id, fetchCart)}
              className="empty"
            >
              EMPTY CART
            </button>
            <button className="checkout">
              <Link to={"/checkout"}>CHECKOUT</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const handleIncrement = async (cartitem, user, fetchCart) => {
  try {
    const data = await axios.post(`${apiUrl}cart/add`, {
      customer_id: user.id,
      product_id: cartitem.id,
    });

    fetchCart();
  } catch (err) {
    console.log(err.message);
  }
};

const handleDecrement = async (cartitem, user, fetchCart) => {
  try {
    const data = await axios.post(`${apiUrl}cart/remove`, {
      customer_id: user.id,
      product_id: cartitem.id,
    });

    fetchCart();
  } catch (err) {
    console.log(err.message);
  }
};

const handleEmptiengCart = async (id, fetchCart) => {
  try {
    const data = await axios.get(`${apiUrl}cart/empty/${id}`);
    fetchCart();
  } catch (err) {
    console.log(err.message);
  }
};

const CartCard = ({ item, cartitem, user, fetchCart }) => {
  return (
    <div className="cartcard">
      <img className="card-img" src={cartitem.image} alt="Product" />
      <div className="card-content">
        <h3 className="card-title">{cartitem.name}</h3>
        <h4 className="card-subtitle">{cartitem.category}</h4>
        <div className="card-footer">
          <h4 className="card-price">₹{cartitem.price * item.count} </h4>
          <div className="cartcardcontrol">
            <button
              onClick={() => handleIncrement(cartitem, user, fetchCart)}
              className="card-button"
            >
              +
            </button>
            {item.count}
            <button
              onClick={() => handleDecrement(cartitem, user, fetchCart)}
              className="card-button"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
