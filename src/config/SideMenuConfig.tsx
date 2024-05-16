import { BiSolidNotification } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoCalendar, IoNewspaper, IoWallet } from "react-icons/io5";
import { TbLayoutDashboard } from "react-icons/tb";

export const SideMenuConfig = () => {
  return [
    {
      id: "Dashboard",
      title: "Dashboard",
      icon: () => (
        <TbLayoutDashboard className="w-6 h-6 fill-secondary text-secondary" />
      ),
      url: "/dashboard",
    },
    {
      id: "Appointment",
      title: "Appointment",
      icon: () => <IoCalendar className="w-6 h-6 fill-secondary" />,
      url: "/appointments",
    },
    {
      id: "Wallet",
      title: "Wallet",
      icon: () => <IoWallet className="w-6 h-6 fill-secondary" />,
      url: "/wallet",
    },
    {
      id: "Health News",
      title: "Health News",
      icon: () => <IoNewspaper className="w-6 h-6 fill-secondary" />,
      url: "/health-news",
    },
    {
      id: "Profile",
      title: "Profile",
      icon: () => <FaUser className="w-6 h-6 fill-secondary" />,
      url: "/Profile",
    },
    {
      id: "Notifications",
      title: "Notifications",
      icon: () => <BiSolidNotification className="w-6 h-6 fill-secondary" />,
      url: "/notifications",
    },
  ];
};
