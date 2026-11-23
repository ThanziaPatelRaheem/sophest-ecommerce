import React from "react";
import MetaData from "../../components/Layout/MetaData";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../redux/features/cartSlice";

import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems = [] } = useSelector((state) => state.cart);

  const itemCount = cartItems.length;

  const totalUnits = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
      currencyDisplay: "narrowSymbol",
    })
      .format(price)
      .replace("$", "S$");

  return (
    <>
      <MetaData title="Your Shopping Bag | Sophest" />

      <main className="main-cart">
        <div className="cart-container">
          {itemCount === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <Link to="/products" className="cart-back-link">
                <MdKeyboardDoubleArrowLeft />
                Continue Shopping
              </Link>

              <div className="cart-page-heading">
                <h1>Your Shopping Bag</h1>
                <p>
                  {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
                </p>
              </div>

              <div className="cart-layout">
                <section
                  className="cart-products"
                  aria-label="Shopping bag items"
                >
                  {cartItems.map((item) => (
                    <article key={item.product} className="cart-product-card">
                      <Link
                        to={`/products/${item.product}`}
                        className="cart-product-image"
                      >
                        <img src={item.image} alt={item.name} />
                      </Link>

                      <div className="cart-product-info">
                        <div className="cart-product-top">
                          <div>
                            <Link
                              to={`/products/${item.product}`}
                              className="cart-product-title"
                            >
                              {item.name}
                            </Link>

                            {item.weight && (
                              <p className="cart-product-weight">
                                {item.weight}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            className="cart-remove-button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() =>
                              dispatch(removeItemFromCart(item.product))
                            }
                          >
                            <RiDeleteBin7Line />
                          </button>
                        </div>

                        <div className="cart-product-bottom">
                          <div className="cart-quantity-control">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                dispatch(decreaseItemQuantity(item.product))
                              }
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              disabled={
                                typeof item.stock === "number" &&
                                item.quantity >= item.stock
                              }
                              onClick={() =>
                                dispatch(increaseItemQuantity(item.product))
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="cart-product-pricing">
                            <strong>
                              {formatPrice(item.price * item.quantity)}
                            </strong>
                            {item.quantity > 1 && (
                              <span>{formatPrice(item.price)} each</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>

                <aside className="cart-summary">
                  <h2>Order Summary</h2>

                  <div className="cart-summary-row">
                    <span>Items</span>
                    <span>{totalUnits}</span>
                  </div>

                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="cart-summary-row">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="cart-summary-divider" />

                  <div className="cart-summary-total">
                    <span>Estimated Total</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>

                  <Link to="/shipping" className="cart-checkout-button">
                    Proceed to Checkout
                    <span>{formatPrice(subtotal)}</span>
                  </Link>

                  <Link to="/products" className="cart-continue-link">
                    Continue Shopping
                  </Link>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
