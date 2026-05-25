import { FaHome, FaUserFriends, FaQrcode, FaHistory } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/resident/dashboard', icon: <FaHome /> },
    { name: 'Create Pass', path: '/resident/create-pass', icon: <FaQrcode /> },
    { name: 'My Guests', path: '/resident/my-guests', icon: <FaUserFriends /> },
    { name: 'History', path: '/resident/history', icon: <FaHistory /> },
    { name: 'Settings', path: '/resident/settings', icon: <CiSettings /> }
  ];

  return (
    <div className="fixed left-0 top-0 w-[180px] h-screen bg-[#1a2b3c] text-white pt-10">

      <div className="flex flex-col gap-2 px-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-[#0f172a] border-l-4 border-green-400 text-green-400 font-semibold'
                  : 'text-gray-50 hover:bg-[#0f172a] hover:text-green-400'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default Sidebar;