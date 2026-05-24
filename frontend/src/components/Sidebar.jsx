import {
  FaHome,
  FaUserFriends,
  FaQrcode,
  FaHistory
} from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/resident",
      icon: <FaHome />
    },

    {
      name: "Create Pass",
      path: "resident//create-pass",
      icon: <FaQrcode />
    },

    {
      name: "My Guests",
      path: "resident//my-guests",
      icon: <FaUserFriends />
    },

    {
      name: "History",
      path: "resident/history",
      icon: <FaHistory />
    },

    {
      name: "Settings",
      path: "resident/settings",
      icon: <CiSettings />
    }
  ];

  return (

    <div className="w-[250px] h-screen bg-black text-white p-5">

      {/* LOGO */}
      <h1 className="text-3xl font-bold mb-10">
        SocietyQR
      </h1>

      {/* MENU */}
      <div className="flex flex-col gap-3">

        {menuItems.map((item, index) => (

          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200

            ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span className="text-lg">
              {item.name}
            </span>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default Sidebar;