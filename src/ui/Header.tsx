import { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import demoImage from "../assets/avatar2.png";
import { useAppContext } from "../hooks/useAppContext";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Badge } from "@mui/material";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Data/State/AuthSlice";
import { RootState } from "../Data/State/store";
import { useGetNotificationsByUserIdQuery } from "../Data/Api/ApiHandler";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { toggleSideMenu, openHamburger } = useAppContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.userDetails);

  const id = user._id;
  const profilePicture = user.profilePicture;

  const {
    data: notifications,
    isLoading: loadingNotifications,
    isError: notificationError,
  } = useGetNotificationsByUserIdQuery(id);

  function handleCloseAction() {
    dispatch(logOut());
  }

  if (loadingNotifications) return <p>Loading...</p>;
  if (notifications?.hasError || notificationError)
    return <p>Error fetching notifications...</p>;

  const unread = notifications.data.filter((el: { read: string }) => !el.read);

  return (
    <header className="bg-secondary_light_2 border-secondary_light col-start-1 lg:col-start-2 col-end-9 border-b-2">
      <div
        className={`flex justify-between items-center py-1 px-7 ${
          // openHamburger && "col-start-1"
          ""
        }`}
      >
        <span
          className={`lg:ml-2 lg:invisible ${
            openHamburger
              ? "ml-32 sm:ml-36 md:ml-52 hamburger_position_open"
              : "ml-4 hamburger_position_close"
          }`}
          onClick={toggleSideMenu}
        >
          {openHamburger ? <CloseIcon /> : <MenuOpenIcon />}
        </span>
        {/* <div className="flex items-center gap-8"> */}
        <figure className="w-12 h-12 rounded-full overflow-clip">
          <img
            src={profilePicture || demoImage}
            alt="Profile Image"
            className="w-full h-full"
          />
        </figure>
        <span className="flex gap-4 md:gap-9">
          {unread.length >= 1 ? (
            <Badge
              badgeContent={unread.length}
              color="primary"
              onClick={() => navigate("/notifications")}
              className="cursor-pointer"
            >
              <IoNotificationsSharp className="w-6 h-6 fill-secondary" />
              {/* <MailIcon color="action" /> */}
            </Badge>
          ) : (
            <IoNotificationsSharp
              onClick={() => navigate("/notifications")}
              className="w-6 h-6 fill-secondary cursor-pointer"
            />
          )}
          <IoExitOutline
            className="w-6 h-6 fill-secondary cursor-pointer"
            onClick={handleOpen}
          />
        </span>
        {/* </div> */}
      </div>
      <ConfirmModal
        open={open}
        handleClose={handleClose}
        title={"Are you sure you want to leave?"}
        body={"You're logging out of the application"}
        action={handleCloseAction}
      />
    </header>
  );
};
