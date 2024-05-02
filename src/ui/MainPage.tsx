import React from "react";
import { useAppContext } from "../context/AppContext";

export const MainPage = ({ children }: { children: React.ReactNode }) => {
  const { openHamburger } = useAppContext();
  return (
    <div
      className={`col-start-1 overflow-scroll styled-scrollbar lg:col-start-2 col-end-9 row-start-2 row-end-13 bg-secondary_light px-6 py-4 ${
        // openHamburger && "col-start-1 "
        ""
      }`}
    >
      {children}
    </div>
  );
  // return (
  //   <div className="bg-purple-600">
  //     {children}
  //   </div>
  // );
};
