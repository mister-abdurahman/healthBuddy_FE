import React from "react";
import { IoExit, IoMenu, IoNotificationsSharp } from "react-icons/io5";
import { BiSolidExit } from "react-icons/bi";
import demoImage from "../assets/react.svg";
import { FaHamburger } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { IoMdRemove } from "react-icons/io";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Badge } from "@mui/material";
import { IoExitOutline } from "react-icons/io5";

export const Header = () => {
  const { toggleSideMenu, openHamburger } = useAppContext();
  return (
    <div
      className={`col-start-1 lg:col-start-2 col-end-9 bg-secondary_light_2 border-b-2 border-secondary_light flex justify-between items-center px-7 ${
        // openHamburger && "col-start-1"
        ""
      }`}
    >
      <span
        className={`lg:ml-2 lg:invisible ${
          openHamburger
            ? "ml-32 sm:ml-36 md:ml-44 hamburger_position_open"
            : "ml-4 hamburger_position_close"
        }`}
        onClick={toggleSideMenu}
      >
        {openHamburger ? <CloseIcon /> : <MenuOpenIcon />}
      </span>
      {/* <div className="flex items-center gap-8"> */}
      <figure>
        <img src={demoImage} alt="Profile Image" />
      </figure>
      <span className="flex gap-4 md:gap-9">
        <Badge badgeContent={4} color="primary">
          <IoNotificationsSharp className="w-6 h-6 fill-secondary" />
          {/* <MailIcon color="action" /> */}
        </Badge>
        <IoExitOutline className="w-6 h-6 fill-secondary" />
      </span>
      {/* </div> */}
    </div>
  );
};
