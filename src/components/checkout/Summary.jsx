import React, { useContext, useEffect, useState } from "react";
import { AgriContext } from "../../context/AgriContext";

const Summary = ({ checkoutAdress }) => {
  const { products, cart, total, setTotal } = useContext(AgriContext);

  return (
    <div>
      <h2>Order Summary</h2>
      <p>
        Here is the summary of the items & address here, please check and
        confirm.
      </p>
      <div className="cartsummary">
        {cart.map((item) => {
          const cartproduct = products.filter(
            (item2) => item.product_id === item2.id
          );
          console.log(cartproduct);
          return (
            <div key={item._id}>
              <span>{cartproduct[0].name}</span>
              <span>Qty: {item.count}</span>
              <span>Price: {cartproduct[0].price * item.count}</span>
            </div>
          );
        })}
      </div>
      <div className="totalsummary">Total amount to be paid: {+total}</div>
      <div className="checkoutaddress">
        <h3>{checkoutAdress.name}</h3>
        <p>{checkoutAdress.line1}</p>
        <p>{checkoutAdress.line2}</p>
        <p>
          {checkoutAdress.city}, {checkoutAdress.state} -{" "}
          {checkoutAdress.pincode}
        </p>
        <p>Mobile: {checkoutAdress.mobile}</p>
      </div>
    </div>
  );
};

export default Summary;
