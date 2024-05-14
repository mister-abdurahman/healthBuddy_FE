import React from "react";
import demoImage from "../assets/logo.jpg";
import { SideMenuConfig } from "../config/SideMenuConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const SideBar = () => {
  const { openHamburger, closeHamburger } = useAppContext();

  return (
    <div
      className={`col-span-1 z-50 row-start-1 row-end-13 absolute lg:relative h-full lg:h-auto border-r-2 border-secondary_light flex flex-col items-center gap-12 py-10 bg-secondary_light_2 transition-all duration-500 ${
        openHamburger
          ? "left-0 w-2/5 sm:w-1/4 lg:w-auto"
          : "-left-36 lg:left-auto"
      }`}
    >
      <figure className="w-24 h-24 rounded-full overflow-clip">
        <img src={demoImage} alt="company logo" className="w-full" />
      </figure>

      <ul className="flex flex-col gap-4">
        {SideMenuConfig().map((item) => (
          <NavLink
            key={item.id}
            to={`${item.url}`}
            className={`flex gap-3 items-center cursor-pointer px-2 py-1 rounded-md`}
            style={({ isActive }) => {
              return isActive
                ? { backgroundColor: "#cddeff", color: "white" }
                : { backgroundColor: "transparent" };
            }}
            onClick={closeHamburger}
          >
            <span className="">{item.icon()}</span>
            <p className="md:text-sm text-xs lg:text-xs text-secondary">
              {item.title}
            </p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
