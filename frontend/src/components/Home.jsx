import React from "react";
import HeroBanner from "./Sections/HeroBanner";
import ProductCategories from "./Sections/ProductCategories";
import TrendingProducts from "./Sections/TrendingProducts/TrendingProducts";
import FeatureBenefits from "./Sections/FeatureBenefits/FeatureBenefits";
import RecommendedProducts from "./Sections/RecommendedProducts/RecommendedProducts";
import { setCartItem } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import Certifications from "./Sections/Certifications/Certifications";

const Home = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      setCartItem({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url,
        stock: product.stock,
      }),
    );
  };
  return (
    <>
      <main className="home-page">
        <HeroBanner />
        <ProductCategories />
        <FeatureBenefits />
        <TrendingProducts addToCart={handleAddToCart} />
        <RecommendedProducts addToCart={handleAddToCart} />
        <Certifications />
      </main>
    </>
  );
};

export default Home;
