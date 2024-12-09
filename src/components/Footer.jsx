import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to={"/privacy-policy"}>Privacy Policy</Link>
      <Link to={"/shippinganddelivery-policy"}>
        Refund & Cancellation Policy
      </Link>
      <Link to={"/refundandCancellation-policy"}>
        Shipping & Delivey Policy
      </Link>
      <Link to={"/termsandconditions-policy"}>Terms & conditions</Link>
    </footer>
  );
};

export default Footer;
