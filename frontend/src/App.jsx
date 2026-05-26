import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/resident/Dashboard';
import History from './pages/resident/History';
import MyGuests from './pages/resident/MyGuests';
import Settings from './pages/resident/Settings';
import InviteGuest from './pages/resident/InviteGuest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/resident/dashboard" element={<Dashboard />} />
      <Route path="/resident/history" element={<History />} />
      <Route path="/resident/my-guests" element={<MyGuests />} />
      <Route path="/resident/settings" element={<Settings />} />
      <Route path="/resident/invite-guest" element={<InviteGuest />} />
    </Routes>
  );
}

export default App