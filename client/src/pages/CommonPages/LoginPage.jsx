/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/home");
  };

  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/2 flex flex-col p-12">
        <div className="mb-8">
          <img src="arhub_logo.png" alt="AR HUB" className="h-16" />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="text-4xl font-bold">WELCOME</h1>
              <h2 className="mt-2 text-gray-600">Welcome to Accessibility Resource Hub</h2>
            </div>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <img src="google_icon.png" alt="Google logo" className="h-5 w-5 mr-2" />
              Sign in With Google
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/register" className="font-medium text-[#ff9900]">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2slMjBwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="Decorative image of colorful book pages"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}