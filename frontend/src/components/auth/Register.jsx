import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { name, email, password } = user;

  const [register, { data, isLoading, error, isSuccess }] =
    useRegisterMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isSuccess && data?.token) {
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    }

    if (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  }, [isSuccess, data, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };
    register(signUpData);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="sophest-auth">
      <div className="sophest-auth-card">
        <div className="sophest-auth-header">
          <span className="sophest-auth-eyebrow">
            SOPHEST · EVERYDAY ESSENTIALS
          </span>
          <h1>Create your account</h1>
          <p>Join Sophest for a more thoughtful everyday.</p>
        </div>

        <form className="sophest-auth-form" onSubmit={submitHandler}>
          <div className="sophest-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              placeholder="Enter your full name"
              onChange={onChange}
              required
            />
          </div>

          <div className="sophest-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              placeholder="Enter your email address"
              onChange={onChange}
              required
            />
          </div>

          <div className="sophest-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              placeholder="Create a password"
              onChange={onChange}
              required
            />
          </div>

          <button
            type="submit"
            className="sophest-auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="sophest-auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
