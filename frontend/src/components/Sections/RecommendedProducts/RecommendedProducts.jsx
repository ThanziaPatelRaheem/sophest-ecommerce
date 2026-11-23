import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard";
import ScrollArrows from "../../ScrollArrows";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import { useGetRecommendedProductsQuery } from "../../../redux/api/productApi";
import "./RecommendedProducts.css";

const RecommendedProducts = ({ addToCart }) => {
  const { scrollRef, scroll, canScrollLeft, canScrollRight } = useHorizontalScroll(150);

  const { data, isLoading, isFetching, isError } =
    useGetRecommendedProductsQuery();

  const recommendedProducts = data?.products || [];

  return (
    <section className="recommended-section main-grid mobile-card-carousel">
      <div className="section-header-row">
        <div className="product-heading">
          <h2 className="recommend-heading">Recommended Products</h2>
        </div>

        {recommendedProducts.length > 0 && <ScrollArrows onScroll={scroll} canScrollLeft={canScrollLeft} canScrollRight={canScrollRight} />}
      </div>

      <div className="recommended-list-container carousel-track" ref={scrollRef}>
        {isLoading || isFetching ? (
          <p>Loading recommended products...</p>
        ) : isError ? (
          <p>Could not load recommended products.</p>
        ) : recommendedProducts.length === 0 ? (
          <p>No recommended products available yet.</p>
        ) : (
          recommendedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))
        )}
      </div>

      <Link to="/products" className="product-load-more">
        View All Products
      </Link>
    </section>
  );
};

export default RecommendedProducts;
