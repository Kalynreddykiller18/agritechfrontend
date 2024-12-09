import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to={"/PrivacyPolicy.html"}>Privacy Policy</Link>
      <Link to={"/RefundandCancellationPolicy.html"}>
        Refund & Cancellation Policy
      </Link>
      <Link to={"/ShippingandDeliveryPolicy.html"}>
        Shipping & Delivey Policy
      </Link>
      <Link to={"/TermsandConditions.html"}>Terms & conditions</Link>
    </footer>
  );
};

export default Footer;
