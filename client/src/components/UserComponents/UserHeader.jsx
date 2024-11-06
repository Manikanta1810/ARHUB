/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

export default function UserHeader() {

  const navigate = useNavigate();

  const {logout} = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  

const handleLogout = async () => {
  try{
    await logout();
    navigate('/');
  }
  catch(error){
    console.log("logout functionality failed ")
  }
  }


  return (
    <header className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
      <div className="container mx-auto px-4">
        
        <div className="flex items-center justify-between py-2">
        <img src="arhub_logo.png" alt="AR HUB Logo" className="h-14" />
          {/* Centered navigation */}
          <nav className="flex-1 flex justify-center space-x-6">
            <a href="/home" className="hover:text-gray-300">Home</a>
            <a href="/news" className="hover:text-gray-300">News</a>
            <a href="/discussion" className="hover:text-gray-300">Discussions</a>
            <a href="/dat" className="hover:text-gray-300">DA Tech's</a>
            <a href="/arbot" className="hover:text-gray-300">AR BOT</a>
            <a href="/feedback" className="hover:text-gray-300">Feedback</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="theme-toggle"
                    className="sr-only"
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                  />
                  <div className={`block w-14 h-8 rounded-full ${isDarkTheme ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${isDarkTheme ? 'transform translate-x-6' : ''}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium">
                  {isDarkTheme ? 'Dark' : 'Light'} Theme
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={`border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
           
            <div className="flex-grow mx-4">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full pl-10 pr-24 py-2 rounded-full ${
                    isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <div className="absolute right-3 top-2">
                  <select className={`appearance-none bg-transparent pr-8 ${
                    isDarkTheme ? 'text-white' : 'text-gray-800'
                  }`}>
                    <option>All Categories</option>
                    {/* Add more categories as needed */}
                  </select>
                  <ChevronDown className="absolute right-0 top-1 h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                  isDarkTheme ? 'bg-gray-700' : 'bg-white'
                } ring-1 ring-black ring-opacity-5`} style={{zIndex:'999999'}}>
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="/profile" className={`block px-4 py-2 text-sm ${isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Profile</a>
                    <a href="/mylist" className={`block px-4 py-2 text-sm ${isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">My List</a>
                    <a className={`block px-4 py-2 text-sm ${isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem" onClick={handleLogout}>Logout</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}