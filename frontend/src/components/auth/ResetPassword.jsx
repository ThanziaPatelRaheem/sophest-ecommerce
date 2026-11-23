import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfm, setShowConfm] = useState(false);

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Password has been reset successfully!");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password doesn not match, Try again!");
    }
    const data = { password, confirmPassword };
    resetPassword({ token, body: data });
  };

  return (
    <section className="sophest-auth">
      <div className="sophest-auth-card">
        <div className="sophest-auth-header">
          <span className="sophest-auth-eyebrow">ACCOUNT SECURITY</span>
          <h1>Reset your password</h1>
          <p>Create a new password to securely access your Sophest account.</p>
        </div>

        <form className="sophest-auth-form" onSubmit={submitHandler}>
          <div className="sophest-field">
            <label htmlFor="new-password">New Password</label>

            <div className="sophest-password-field">
              <input
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                name="new-password"
                id="new-password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="sophest-password-toggle"
                aria-label={showNew ? "Hide new password" : "Show new password"}
                aria-pressed={showNew}
                onClick={() => setShowNew((v) => !v)}
              >
                {showNew ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          <div className="sophest-field">
            <label htmlFor="conf-new-password">Confirm New Password</label>

            <div className="sophest-password-field">
              <input
                type={showConfm ? "text" : "password"}
                autoComplete="new-password"
                name="conf-new-password"
                id="conf-new-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="sophest-password-toggle"
                aria-label={
                  showConfm
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
                aria-pressed={showConfm}
                onClick={() => setShowConfm((v) => !v)}
              >
                {showConfm ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="sophest-auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="sophest-auth-footer">
          Remember your password? <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
