import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div style={{ display: "grid", placeContent: "center",paddingTop:"20px" }}>
      <h2 style={{ textAlign: "center" }}>Thanks for your order!</h2>
      <h4 style={{ textAlign: "center" }}>Your payment is successful.</h4>
      <p style={{ textAlign: "center" }}>
        We appreciate your business! If you have any questions, please email us
        at <Link to="mailto:rd8614196@gmail.com">rd8614196@gmail.com</Link>.
      </p>
      <p style={{ textAlign: "center" }}>Go back to <i><Link to="/">homepage</Link></i></p>
      <div></div>
    </div>
  );
};

export default Success;
