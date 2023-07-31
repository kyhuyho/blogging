import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import NotFoundPage from "../../pages/NotFoundPage";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <div className="w-[1500px] mx-auto">
      <DashboardHeader></DashboardHeader>
      <div className="mt-[100px] flex items-start gap-x-12">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
