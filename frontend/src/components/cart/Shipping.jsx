import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import MetaData from "../../components/Layout/MetaData";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Singapore");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    if (shippingInfo?.country === "Singapore") {
      setAddress(shippingInfo.address || "");
      setCity(shippingInfo.city || "Singapore");
      setPostalCode(shippingInfo.zipCode || "");
      setPhoneNo(shippingInfo.phoneNo || "");
    }
  }, [shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const cleanPostalCode = postalCode.trim();
    const cleanPhoneNo = phoneNo.replace(/\s/g, "");

    if (!/^\d{6}$/.test(cleanPostalCode)) {
      alert("Please enter a valid 6-digit Singapore postal code.");
      return;
    }

    if (!/^[689]\d{7}$/.test(cleanPhoneNo)) {
      alert("Please enter a valid Singapore mobile number.");
      return;
    }

    dispatch(
      saveShippingInfo({
        address: address.trim(),
        city: city.trim(),
        zipCode: cleanPostalCode,
        phoneNo: cleanPhoneNo,
        country: "Singapore",
      }),
    );

    navigate("/confirm-order");
  };

  return (
    <>
      <MetaData title="Delivery Details | Sophest" />

      <main className="sophest-shipping-page">
        <div className="sophest-shipping-container">
          <Link to="/cart" className="shipping-back-link">
            ← Back to Shopping Bag
          </Link>

          <div className="shipping-page-header">
            <h1>Delivery Details</h1>
            <p>Where should we deliver your Sophest essentials?</p>
          </div>

          <section className="shipping-card">
            <div className="shipping-card-header">
              <h2>Shipping Address</h2>
              <p>Currently delivering within Singapore</p>
            </div>

            <form className="sophest-shipping-form" onSubmit={submitHandler}>
              <div className="shipping-field">
                <label htmlFor="address">
                  Street Address <span>*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  autoComplete="street-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Block, street name, unit number"
                />
              </div>

              <div className="shipping-field-row">
                <div className="shipping-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="shipping-field">
                  <label htmlFor="postalCode">
                    Postal Code <span>*</span>
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 550123"
                  />
                </div>
              </div>

              <div className="shipping-field">
                <label htmlFor="phoneNo">
                  Mobile Number <span>*</span>
                </label>
                <input
                  id="phoneNo"
                  name="phoneNo"
                  type="tel"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="e.g. 9123 4567"
                />
              </div>

              <div className="shipping-field">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value="Singapore"
                  readOnly
                />
              </div>

              <button type="submit" className="shipping-continue-btn">
                Continue to Order Review
                <span>→</span>
              </button>

              <p className="shipping-secure-note">
                Your delivery information will be used to process your order.
              </p>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default Shipping;
