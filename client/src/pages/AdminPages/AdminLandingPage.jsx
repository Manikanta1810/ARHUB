/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { UserCircle, ChevronDown, LayoutDashboard, Users, MessageSquare } from 'lucide-react';
import AdminUserManagement from './AdminUserManagement';
import AdminDashboard from './AdminDashboard';
import AdminFeedbackSystem from './AdminFeedbackSystem';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'User Management', icon: Users },
    { name: 'Feedback Management', icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4 text-xl font-bold">AR ADMIN PORTAL</div>
      <nav>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeItem === item.name ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <item.icon className="inline-block mr-2" />
            {item.name}
          </div>
        ))}
      </nav>
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md p-4 flex justify-end">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center focus:outline-none"
        >
          <UserCircle className="h-8 w-8 text-gray-700" />
          <ChevronDown className="h-4 w-4 ml-1 text-gray-700" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};




const AdminLandingPage = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="flex h-screen">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {activeItem === 'Dashboard' && <AdminDashboard />}
          {activeItem === 'User Management' && <AdminUserManagement />}
          {activeItem === 'Feedback Management' && <AdminFeedbackSystem />}
        </main>
      </div>
    </div>
  );
};

export default AdminLandingPage;