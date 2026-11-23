import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productApi.js";
import toast from "react-hot-toast";
import MetaData from "../Layout/MetaData";
import { PRODUCT_CATEGORIES } from "../../data/productCategories.js";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    weight: "",
    isTrending: false,
    isRecommended: false,
  });

  const {
    name,
    shortDescription,
    description,
    price,
    stock,
    weight,
    category,
    isTrending,
    isRecommended,
  } = product;

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product created");
      navigate("/admin/products");
    }
  }, [error, isSuccess]);

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };
  return (
    <>
      <MetaData title={`Create new Product`} />
      <section className="create-product-section main-grid">
        <div className="create-product-wrapper">
          <div className="create-product-heading">
            <div>
              <h1>Create New Product</h1>
              <p>Add a new product to your Sophest collection</p>
            </div>
            <span className="create-product-admin-label">Sophest Admin</span>
          </div>

          <form className="create-product-new-form" onSubmit={submitHandler}>
            <div className="create-product-form-heading">
              <h3>Product Information</h3>
              <p>Enter the details of your new product</p>
            </div>

            <div className="create-product-form-grid">
              <div className="create-product-field full-width">
                <label htmlFor="name">Product Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="create-product-field full-width">
                <label htmlFor="shortDescription">Short Description</label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={shortDescription}
                  onChange={onChange}
                  placeholder="Brief product summary"
                  rows={2}
                />
              </div>

              <div className="create-product-field full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  placeholder="Detailed product description"
                  rows={4}
                />
              </div>

              <div className="create-product-field">
                <label htmlFor="price">Price (SGD)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={onChange}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="create-product-field">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  value={stock}
                  onChange={onChange}
                  placeholder="Enter stock"
                  required
                />
              </div>

              <div className="create-product-field">
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={onChange}
                  placeholder="e.g. 500g"
                />
              </div>

              <div className="create-product-field">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={onChange}
                  required
                >
                  <option value="">Select category</option>
                  {PRODUCT_CATEGORIES?.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="create-product-options">
              <h3>Product Visibility</h3>

              <div className="trending-products">
                <label htmlFor="isTrending">Show in Trending</label>
                <input
                  type="checkbox"
                  id="isTrending"
                  name="isTrending"
                  checked={isTrending}
                  onChange={onChange}
                />
              </div>

              <div className="recommended-products">
                <label htmlFor="isRecommended">Show in Recommended</label>
                <input
                  type="checkbox"
                  id="isRecommended"
                  name="isRecommended"
                  checked={isRecommended}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="create-product-actions">
              <button
                type="submit"
                className="create-product-btn"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewProduct;
