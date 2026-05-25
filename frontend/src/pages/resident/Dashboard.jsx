import React from 'react';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <SideBar />

      {/* Right section */}
      <div className="flex flex-col flex-1 ml-[180px]">

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 mt-10 p-5 overflow-y-auto bg-gray-50">

          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;