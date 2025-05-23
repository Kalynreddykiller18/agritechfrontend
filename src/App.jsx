import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";
import "./components/authentication/authentication.css";
import "./index.css";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import ResetPassword from "./components/authentication/reset-password";
import ForgotPassword from "./components/authentication/forgot-password";
import Navigation from "./components/Navigation";
import Seeds from "./components/products/Seeds";
import Fertilizers from "./components/products/Fertilizers";
import Pecticides from "./components/products/Pecticides";
import Cart from "./components/Cart";
import { AgriContextProvider } from "./context/AgriContext";
import Checkout from "./components/checkout/Checkout";
import {
  TermsAndConditions,
  Shipping,
  Privacy,
  Cancellation,
} from "./components/policy";
import Footer from "./components/Footer";
import OrderConfirm from "./components/checkout/OrderConfirm";
import Order from "./components/Order";

const App = () => {
  return (
    <AgriContextProvider>
      <ErrorBoundary>
        <Router>
          <div className="background"></div>
          <Navigation />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  // <ProtectedRoute isLogged={logged}>
                  <Dashboard />
                  // </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/seeds" element={<Seeds />} />
              <Route path="/fertilizers" element={<Fertilizers />} />
              <Route path="/pecticides" element={<Pecticides />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route
                path="/shippinganddelivery-policy"
                element={<Shipping />}
              />
              <Route
                path="/refundandCancellation-policy"
                element={<Cancellation />}
              />
              <Route
                path="/termsandconditions-policy"
                element={<TermsAndConditions />}
              />
              <Route path="/orderconfirm/:token" element={<OrderConfirm />} />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <div className="spacecover" />
          <Footer />
        </Router>
      </ErrorBoundary>
    </AgriContextProvider>
  );
};

export default App;
