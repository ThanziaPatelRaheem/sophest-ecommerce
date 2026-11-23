import React from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { useSelector } from "react-redux";
import DefaultPicture from "../assets/images/default-image.png";

const ProductCard = ({
  product = {},
  addToCart = () => {},
  openInNewTab = false,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const inCart = cartItems.some((i) => i.product === product._id);

  const { _id, images, name, weight, price, category, isTrending, stock } =
    product;

  const mainImage = images?.[0]?.url || DefaultPicture;

  const formattedPrice = Number(price ?? 0).toLocaleString("en-SG", {
    style: "currency",
    currency: "SGD",
  });

  return (
    <article className="product-container">
      <div className="product-image-wrapper">
        {isTrending && <span className="product-badge">Popular</span>}

        <Link
          to={`/products/${_id}`}
          className="product-image-container"
          target={openInNewTab ? "_blank" : "_self"}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          <img
            src={mainImage}
            alt={`${name} ${weight}`}
            className="product-card-image"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="product-details">
        <p className="product-category">{category}</p>

        <Link
          to={`/products/${_id}`}
          className="product-title-link"
          target={openInNewTab ? "_blank" : "_self"}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          <h3 className="product-title">{name}</h3>
        </Link>

        <div className="product-footer-row">
          <span className="product-weight">{weight}</span>
          <span className="product-price">{formattedPrice}</span>
        </div>
      </div>

      {!inCart ? (
        <button
          type="button"
          className="hero-cart-btn"
          onClick={() => addToCart(product)}
          disabled={stock <= 0}
        >
          <CgShoppingCart className="cart-card-icon" />
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      ) : (
        <Link to="/cart" className="hero-cart-btn">
          View Cart
        </Link>
      )}
    </article>
  );
};

export default ProductCard;
