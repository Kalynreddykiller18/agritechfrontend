import React, { createContext, useState, useEffect, Children } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const AgriContext = createContext();

export const AgriContextProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartno, setCartno] = useState(0);

  const fetchProducts = async () => {
    try {
      const data = await axios.get(`${apiUrl}product/`);
      setProducts(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await axios.get(`${apiUrl}customer/${user.id}`);
      setUser(data.data.customer);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchCart = async () => {
    try {
      setCartno(0);
      const data = await axios.get(`${apiUrl}cart/${user.id}`);
      setCart(data.data);
      data.data.forEach((item) => setCartno((prev) => prev + item.count));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (logged) {
      fetchCart();
    }
  }, [logged]);

  const contextValue = {
    products,
    logged,
    setLogged,
    cart,
    setCart,
    fetchCart,
    user,
    setUser,
    fetchUser,
    total,
    setTotal,
    cartno,
  };

  return (
    <AgriContext.Provider value={contextValue}>{children}</AgriContext.Provider>
  );
};
