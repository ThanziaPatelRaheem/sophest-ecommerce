import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  return (
    <div className="site-wrapper">
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 3500,
          style: {
            background: "#FAF7EF",
            color: "#0F3B2E",
            border: "1px solid #D4AF78",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 4px 16px rgba(15, 59, 46, 0.10)",
          },
          success: {
            iconTheme: {
              primary: "#0F3B2E",
              secondary: "#FAF7EF",
            },
          },
          error: {
            iconTheme: {
              primary: "#B45343",
              secondary: "#FAF7EF",
            },
          },
        }}
      />

      <Header />

      <main className="main-content-wrapper ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
