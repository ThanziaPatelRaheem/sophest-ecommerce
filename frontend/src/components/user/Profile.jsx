import React from "react";
import DefaultPicture from "../../assets/images/profileIcon.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <aside className="profile-section">
        <div className="profile-image-container">
          <img
            src={user?.avatar ? user?.avatar?.url : DefaultPicture}
            alt={user?.name}
            className="profile-picture"
          />
        </div>
        <div className="profile-detail-container">
          <h2 className="profile-card-heading">Account Information</h2>

          <div className="profile-info-row">
            <span className="profile-info-label">Full Name</span>
            <span className="profile-info-value">{user?.name}</span>
          </div>

          <div className="profile-info-row">
            <span className="profile-info-label">Email Address</span>
            <span className="profile-info-value">{user?.email}</span>
          </div>

          <div className="profile-info-row">
            <span className="profile-info-label">Member Since</span>
            <span className="profile-info-value">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-SG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Profile;
