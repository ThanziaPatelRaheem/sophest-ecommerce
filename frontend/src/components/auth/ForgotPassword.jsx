import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Email sent. Please check your inbox");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  };

  return (
    <section className="sophest-auth">
      <div className="sophest-auth-card">
        <div className="sophest-auth-header">
          <span className="sophest-auth-eyebrow">
            SOPHEST · EVERYDAY ESSENTIALS
          </span>

          <h1>Forgot your password?</h1>

          <p>
            No worries. Enter your registered email address and we'll send you a
            link to reset your password.
          </p>
        </div>

        <form className="sophest-auth-form" onSubmit={submitHandler}>
          <div className="sophest-field">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="sophest-auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <p className="sophest-auth-footer">
          Remember your password? <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
