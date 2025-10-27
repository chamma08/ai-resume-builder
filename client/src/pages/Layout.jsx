import React from "react";
import { Outlet } from "react-router-dom";
import bgMain from "../assets/bg-main.svg";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";

export default function Layout() {
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
