import React from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { MainPage } from "./MainPage";
import RoutePage from "../config/RoutePage";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    // <div className="h-screen app-layout">
    <div className="h-screen grid grid-cols-7 grid-rows-12">
      <Header />
      <SideBar />
      <MainPage>
        {/* <RoutePage /> */}
        <Outlet />
      </MainPage>
    </div>
  );
};
