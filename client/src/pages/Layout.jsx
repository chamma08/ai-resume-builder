import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import bgMain from "../assets/bg-main.svg";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

export default function Layout() {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    // Preserve the attempted location to redirect after login
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${bgMain})` }}
    >
      <div>
        <Navbar />
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  );
}
