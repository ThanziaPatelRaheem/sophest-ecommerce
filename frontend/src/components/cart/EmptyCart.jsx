import React from "react";
import { PiShoppingBagLight } from "react-icons/pi";

import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const EmptyCart = () => {
  return (
    <>
      <MetaData title={"Empty Cart"} />
      <section className="empty-cart-section">
        <div className="empty-wrapper">
          <div className="empty-cart-img-container">
            <PiShoppingBagLight
              className="empty-cart-icon"
              aria-hidden="true"
            />
          </div>

          <div className="empty-cart-details">
            <h2>Your cart is empty</h2>
            <p>
              Your next everyday essential is just a click away. Explore our
              collection to get started.
            </p>
          </div>

          <Link to="/products" className="empty-cart-button">
            Start shopping
          </Link>
        </div>
      </section>
    </>
  );
};

export default EmptyCart;
