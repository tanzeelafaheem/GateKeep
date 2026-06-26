import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Dashboard from './pages/resident/Dashboard';
import History from './pages/resident/History';
import MyGuests from './pages/resident/MyGuests';
import Settings from './pages/resident/Settings';
import InviteGuest from './pages/resident/InviteGuest';
import ViewQR from './components/ViewQR';
import QRscan from './pages/guard/QRscan';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/resident/dashboard" element={<Dashboard />} />
        <Route path="/resident/history" element={<History />} />
        <Route path="/resident/my-guests" element={<MyGuests />} />
        <Route path="/resident/settings" element={<Settings />} />
        <Route path="/resident/invite-guest" element={<InviteGuest />} />
        <Route path="/viewQR" element={<ViewQR />} />
        <Route path="/guard/qr-scan" element={<QRscan />} />
      </Routes>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="light"
      />
    </>
  );
}

export default App;
