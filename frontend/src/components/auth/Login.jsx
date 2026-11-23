import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [login, { data, isLoading, error, isSuccess }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        toast.error("Unable to sign in. Please check your email and password.");
      } else {
        toast.error(
          error?.data?.message || "Something went wrong. Please try again.",
        );
      }
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isSuccess && data?.token) {
      toast.success("Logged in successfully");
      navigate("/");
    }
  }, [isSuccess, data, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };
    login(loginData);
  };

  return (
    <section className="sophest-auth">
      <div className="sophest-auth-card">
        <div className="sophest-auth-header">
          <span className="sophest-auth-eyebrow">
            SOPHEST · EVERYDAY ESSENTIALS
          </span>
          <h1>Welcome back</h1>
          <p>Sign in to continue your Sophest experience.</p>
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

          <div className="sophest-field">
            <div className="sophest-field-heading">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="sophest-auth-link">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="sophest-auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="sophest-auth-footer">
          New to Sophest? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
