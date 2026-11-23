import React from "react";
import { Link } from "react-router-dom";
import bathroom from "../../assets/images/bathroom.png";
import brews from "../../assets/images/brews.png";
import honey from "../../assets/images/honey.png";
import kitchen from "../../assets/images/kitchen.png";
import laundry from "../../assets/images/laundry.png";
import spices from "../../assets/images/spices.png";

import { CgShapeCircle } from "react-icons/cg";
import ScrollArrows from "../ScrollArrows";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";

const ProductCategories = () => {
  const { scrollRef, scroll, canScrollLeft, canScrollRight } = useHorizontalScroll(150);
  const categories = [
    {
      name: "Laundry",
      image: laundry,
      value: "Laundry",
      description: "Gentle care for every fabric.",
    },
    {
      name: "Kitchen",
      image: kitchen,
      value: "Kitchen",
      description: "Everyday cleaning made simple.",
    },
    {
      name: "Bathroom",
      image: bathroom,
      value: "Bathroom & Hygiene",
      description: "A fresher, cleaner space.",
    },
    {
      name: "Spices",
      image: spices,
      value: "Spices",
      description: "Authentic flavours, naturally.",
    },
    {
      name: "Honey",
      image: honey,
      value: "Honey",
      description: "Nature's golden goodness.",
    },
    {
      name: "Brews",
      image: brews,
      value: "Brews",
      description: "Comfort in every cup.",
    },
  ];

  return (
    <>
      <section className="categories-section main-grid mobile-card-carousel">
        <div className="section-header-row">
          <div className="product-heading">
            <h2 className="category-title">Shop by Collection</h2>
          </div>

          <ScrollArrows onScroll={scroll} canScrollLeft={canScrollLeft} canScrollRight={canScrollRight} />
        </div>

        <div className="category-list-container carousel-track" ref={scrollRef}>
          {categories.map((cat, index) => (
            <Link
              to={`/products?category=${encodeURIComponent(cat.value)}`}
              key={index}
              className="category-item"
            >
              <div className="category-icon-wrapper">
                <img
                  src={cat.image}
                  className="category-image"
                  alt={cat.name}
                />
              </div>
              <div className="category-card-content">
                <div className="category-card-text">
                  <p className="category-name">{cat.name}</p>
                  <p className="category-description">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductCategories;
