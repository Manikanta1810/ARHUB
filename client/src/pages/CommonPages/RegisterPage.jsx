import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, googleProvider, firestore } from '../../firebase'; // Adjust the path as necessary
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    username: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Save data to 'users' collection
        await setDoc(doc(firestore, 'users', user.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          username: formData.username,
          authMethod: 'email',
          isAdmin: false,
        });

        // Create user_profile document
        await setDoc(doc(firestore, 'user_profile', user.uid), {
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          address: formData.address,
          linkedin_url: '',
          github_url: '',
          image_url: '',
        });

        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error('Detailed error:', error);
        toast.error(error.message || "Registration failed. Please try again.");
      }
    } else {
      toast.error("Please correct the errors in the form.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save data to 'google_users' collection
      await setDoc(doc(firestore, 'google_users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: false,
        authMethod: 'google'
      });

      // Create user_profile document for Google user
      await setDoc(doc(firestore, 'user_profile', user.uid), {
        email: user.email,
        image_url: user.photoURL || '',
        first_name: user.displayName ? user.displayName.split(' ')[0] : '',
        last_name: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
        username: '',
        address: '',
        linkedin_url: '',
        github_url: '',
      });

      toast.success("Google sign-up successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
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
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
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
              {['firstName', 'lastName', 'email', 'address', 'username', 'password'].map((field) => (
                <div key={field}>
                  <input
                    id={field}
                    name={field}
                    type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm`}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                  {errors[field] && <p className="mt-1 text-xs text-red-500">{errors[field]}</p>}
                </div>
              ))}

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