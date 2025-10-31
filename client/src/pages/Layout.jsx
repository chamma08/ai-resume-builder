import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import bgMain from "../assets/bg-main.svg";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

export default function Layout() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
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
