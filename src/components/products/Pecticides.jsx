import React, { useContext } from "react";
import Product from "./product/Product";
import { AgriContext } from "../../context/AgriContext";

const Pecticides = () => {
  const { products, logged, cart, setCart } = useContext(AgriContext);
  return (
    <div className="products">
      {products.map((item) => {
        if (item.category == "Pecticide") {
          return (
            <Product
              key={item._id}
              item={item}
              logged={logged}
              cart={cart}
              setCart={setCart}
            />
          );
        }
      })}
    </div>
  );
};

export default Pecticides;
