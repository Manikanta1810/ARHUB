/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex flex-col p-4 lg:p-8 overflow-y-auto">
        <div className="mb-1 lg:mb-8">
          <img src="/arhub_logo.png" alt="AR HUB" className="h-8 " />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md space-y-4 lg:space-y-6">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold">WELCOME</h1>
              <h2 className="mt-1 lg:mt-2 text-sm lg:text-base text-gray-600">Welcome to Accessibility Resource Hub</h2>
            </div>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <img src="google_icon.png" alt="Google logo" className="h-5 w-5 mr-2" />
              Continue With Google
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                {['firstName', 'lastName', 'email', 'address', 'username', 'password'].map((field) => (
                  <div key={field}>
                    <input
                      id={field}
                      name={field}
                      type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/" className="font-medium text-[#ff9900]">
                Log in
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