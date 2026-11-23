import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import { calculateOrderCost } from "../../helpers/helper";

const ConfirmOrder = () => {
  const { cartItems = [], shippingInfo } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderCost(cartItems);

  const formatPrice = (value) => `S$${Number(value ?? 0).toFixed(2)}`;

  return (
    <>
      <MetaData title="Review Your Order | Sophest" />

      <main className="sophest-confirm-page">
        <div className="sophest-confirm-container">
          <Link to="/shipping" className="confirm-back-link">
            ← Back to Delivery Details
          </Link>

          <div className="confirm-page-header">
            <h1>Review Your Order</h1>
            <p>
              Please review your items and delivery details before proceeding to
              payment.
            </p>
          </div>

          <div className="confirm-layout">
            <div className="confirm-left">
              <section className="confirm-card">
                <div className="confirm-card-heading">
                  <h2>Delivery Address</h2>
                  <Link to="/shipping">Edit</Link>
                </div>

                <div className="confirm-address-details">
                  <strong>{user?.name}</strong>

                  <p>{shippingInfo?.phoneNo}</p>

                  <p>
                    {shippingInfo?.address}
                    <br />
                    {shippingInfo?.city}, {shippingInfo?.zipCode}
                    <br />
                    {shippingInfo?.country}
                  </p>
                </div>
              </section>

              <section className="confirm-card">
                <div className="confirm-card-heading">
                  <h2>Your Items ({cartItems.length})</h2>
                  <Link to="/cart">Edit Bag</Link>
                </div>

                <div className="confirm-items-list">
                  {cartItems.map((item) => (
                    <article key={item.product} className="confirm-product">
                      <Link
                        to={`/products/${item.product}`}
                        className="confirm-product-image"
                      >
                        <img src={item.image} alt={item.name} />
                      </Link>

                      <div className="confirm-product-info">
                        <Link
                          to={`/products/${item.product}`}
                          className="confirm-product-name"
                        >
                          {item.name}
                        </Link>

                        {item.weight && (
                          <p className="confirm-product-weight">
                            {item.weight}
                          </p>
                        )}

                        <p className="confirm-product-quantity">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="confirm-product-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="confirm-summary-card">
              <h2>Order Summary</h2>

              <div className="confirm-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(itemsPrice)}</span>
              </div>

              <div className="confirm-summary-row">
                <span>Shipping</span>
                <span>{formatPrice(shippingPrice)}</span>
              </div>

              <div className="confirm-summary-row">
                <span>Tax</span>
                <span>{formatPrice(taxPrice)}</span>
              </div>

              <div className="confirm-summary-divider" />

              <div className="confirm-summary-total">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <Link to="/payment-method" className="confirm-payment-btn">
                Proceed to Payment
                <span>→</span>
              </Link>

              <p className="confirm-payment-note">
                Review your payment details on the next step.
              </p>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default ConfirmOrder;
