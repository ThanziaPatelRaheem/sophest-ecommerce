import React, { useEffect, useState, useRef } from "react";
import "./Products.css";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { CgShapeCircle } from "react-icons/cg";
import Loader from "../Layout/Loader";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import MetaData from "../Layout/MetaData";
import { useLazyGetProductsQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Filters from "../Layout/Filters";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // getting the keyword from the url
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");

  const [trigger, { data, isLoading, isFetching, error, isError }] =
    useLazyGetProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = (page) => {
    trigger({
      page,
      limit: 12,
      keyword: keyword?.trim() || undefined,
      min: min ?? undefined,
      max: max ?? undefined,
      category: category ?? undefined,
    });
  };

  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(1);
  }, [keyword, min, max, category]);

  useEffect(() => {
    if (data?.products) {
      setProducts((prevProducts) => {
        if (currentPage === 1) {
          return data.products;
        }
        return [...prevProducts, ...data.products];
      });

      const perPage = data.resPerPage ?? 12;
      const count = data.filteredProductsCount ?? data.totalProducts ?? 0;
      const total = Math.ceil(count / perPage) || 1;

      setTotalPages(total);
    }
  }, [data]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const filterToggleMenu = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isFilterOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isFilterOpen]);

  const filterNav = isFilterOpen ? "filter-section open" : "filter-section";

  useEffect(() => {
    if (!isFilterOpen) return;

    filterRef.current?.querySelector("button")?.focus();
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.querySelector(".products-page-grid .filter-open")?.focus();
    };
  }, [isFilterOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeDrawer = () => {
      if (desktop.matches) setIsFilterOpen(false);
    };
    desktop.addEventListener("change", closeDrawer);
    return () => desktop.removeEventListener("change", closeDrawer);
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
  };

  const hasMore = currentPage < totalPages;
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load products");
    }
  }, [isError]);

  const addToCart = (product) => {
    dispatch(
      setCartItem({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0].url,
        stock: product.stock,
        quantity: 1,
      }),
    );
    toast.success("Added to cart");
  };

  if (isLoading && currentPage === 1) return <Loader />;

  return (
    <>
      <MetaData title={"All Products"} />
      <section className="products-page-grid main-grid">
        <button
          type="button"
          className="filter-btn filter-open"
          aria-expanded={isFilterOpen}
          aria-controls="shop-filters"
          onClick={filterToggleMenu}
        >
          <FiFilter className="filter-open-icon" />
          Filter
        </button>

        {isFilterOpen && (
          <button
            type="button"
            className="filter-backdrop"
            aria-label="Dismiss filters"
            onClick={() => setIsFilterOpen(false)}
          />
        )}
        <aside
          id="shop-filters"
          className={filterNav}
          ref={filterRef}
          aria-label="Product filters"
        >
          <button
            type="button"
            className="filter-btn filter-close"
            aria-label="Close filters"
            onClick={filterToggleMenu}
          >
            <IoClose className="filter-close-icon" />
            Close
          </button>
          <Filters />
        </aside>
        <div className="product-content-area">
          {keyword && (
            <Link to="." relative="path" className="back-btn">
              <MdKeyboardDoubleArrowLeft className="back-arrow-btn" />
              <span className="back-text">Back to all Products</span>
            </Link>
          )}

          <div className="product-header">
            <h1 className="all-products-heading">
              {keyword
                ? `Search Results for "${keyword}"`
                : "Shop Our Essentials"}
            </h1>
          </div>

          {!isFetching && !isError && products.length === 0 && (
            <p className="products-empty">No products found. Try changing your search or filters.</p>
          )}

          <div className="product-list-grid">
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
        <div className="load-more-wrapper">
          {hasMore && !isFetching && (
            <button
              className="product-load-more load-product"
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              {isFetching || isLoading ? "Loading..." : "Load More"}
            </button>
          )}

          {!hasMore && currentPage > 1 && products.length > 0 && (
            <p className="no-more-products-message">
              You've reached the end of the catalog.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
