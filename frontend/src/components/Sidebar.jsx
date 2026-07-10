import { FaHome, FaUserFriends, FaQrcode, FaHistory } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {FaSignOutAlt} from 'react-icons/fa'

function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
      localStorage.removeItem("user"); 
      toast.warn("Logged out successfully");
      window.location.href = "/"; 
    }
    else{
      toast.info("Logout cancelled");
    }
  };
  const menuItems = [
    { name: 'Dashboard', path: '/resident/dashboard', icon: <FaHome /> },
    { name: 'Create Pass', path: '/resident/invite-guest', icon: <FaQrcode /> },
    { name: 'My Guests', path: '/resident/my-guests', icon: <FaUserFriends /> },
    { name: 'History', path: '/resident/history', icon: <FaHistory /> },
    { name: 'Settings', path: '/resident/settings', icon: <CiSettings /> }
  ];

  return (
    <div className="fixed left-0 top-0 w-[180px] h-screen bg-[#1a2b3c] text-white pt-10">
      <h2 className='text-green-500 font-bold px-4'>GATE KEEP</h2>
     <p className="text-gray-500 text-sm px-4 mb-5">Resident portal</p>

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
      <button className="absolute bottom-5 left-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 rounded-lg px-6 py-2.5 text-sm text-white font-medium w-35 cursor-pointer"
      onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;