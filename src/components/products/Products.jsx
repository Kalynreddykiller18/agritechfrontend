import React, { useContext } from "react";
import Product from "./product/Product";
import "./products.css";
import { AgriContext } from "../../context/AgriContext";

const Products = () => {
  const { products, user } = useContext(AgriContext);

  return (
    <div className="products">
      {console.log(user)}
      {products.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Products;
