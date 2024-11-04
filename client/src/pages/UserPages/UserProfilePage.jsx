

// import React, { useState, useEffect } from 'react';
// import { Upload } from 'lucide-react';
// import UserHeader from '../../components/UserComponents/UserHeader';
// import { useAuth } from '../../utils/AuthContext';
// import axios from 'axios';

// const UserProfileManagement = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     address: '',
//     linkedin_url: '',
//     github_url: '',
//     image_url: '',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [newImage, setNewImage] = useState(null);

//   useEffect(() => {
//     fetchUserProfile();
//   }, [user]);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/user-profile/${user.email}`);
//       setProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewImage(file);
//       const reader = new FileReader();
//       reader.onload = (e) => setProfile(prev => ({ ...prev, image_url: e.target.result }));
//       reader.readAsDataURL(file);
//     }
//   };

//   const toggleEditing = () => setIsEditing(!isEditing);

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       Object.keys(profile).forEach(key => {
//         formData.append(key, profile[key] || '');
//       });
//       if (newImage) {
//         formData.append('image', newImage);
//       }
//       const response = await axios.post('http://localhost:5000/update-profile', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       console.log(response.data);
//       setProfile(response.data.profile);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div>
//       <UserHeader />
//       <div className="min-h-screen bg-gray-100">
//         <header className="bg-white shadow">
//           <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile.username || profile.first_name || 'User'}</h1>
//             <p className="mt-1 text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
//           </div>
//         </header>
//         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <div className="px-4 py-6 sm:px-0">
//             <div className="border-b border-gray-200 pb-5 flex justify-between items-center">
//               <div className="flex items-center space-x-5">
//                 <div className="relative">
//                   <img
//                     src={profile.image_url || "https://via.placeholder.com/150"}
//                     alt="Profile"
//                     className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
//                   />
//                   {isEditing && (
//                     <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow">
//                       <Upload className="h-5 w-5 text-gray-500" />
//                     </label>
//                   )}
//                   <input
//                     id="profile-upload"
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">{profile.username || profile.first_name || 'User'}</h2>
//                   <p className="text-sm text-gray-500">{profile.email}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={isEditing ? handleSave : toggleEditing}
//                 className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 {isEditing ? 'Save Changes' : 'Edit Profile'}
//               </button>
//             </div>
            
//             <div className="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//               <div className="sm:col-span-3">
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   value={profile.username || ''}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
//                 />
//               </div>
//               <div className="sm:col-span-3">
//                 <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   id="first_name"
//                   value={profile.first_name || ''}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
//                 />
//               </div>
//               <div className="sm:col-span-3">
//                 <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   id="last_name"
//                   value={profile.last_name || ''}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
//                 />
//               </div>
//               <div className="sm:col-span-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={profile.email || ''}
//                   disabled={true}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 bg-gray-100"
//                 />
//               </div>
//               <div className="sm:col-span-4">
//                 <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   id="address"
//                   value={profile.address || ''}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
//                 />
//               </div>
//               <div className="sm:col-span-4">
//                 <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
//                 <input
//                   type="text"
//                   name="linkedin_url"
//                   id="linkedin_url"
//                   value={profile.linkedin_url || ''}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
//                 />
//               </div>
//               <div className="sm:col-span-4">
//                 <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">GitHub URL</label>
//                 <input
//                   type="text"
//                   name="github_url"
//                   id="github_url"
//                   value={profile.github_url || ''}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
//                 />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserProfileManagement;

import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import UserHeader from '../../components/UserComponents/UserHeader';
import { useAuth } from '../../utils/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebase';

const UserProfileManagement = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    linkedin_url: '',
    github_url: '',
    image_url: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const profileRef = doc(firestore, 'user_profile', user.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setProfile(profileSnap.data());
      } else {
        console.error('User profile not found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfile(prev => ({ ...prev, image_url: e.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      let updatedProfile = { ...profile };
      if (newImage) {
        const imageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(imageRef, newImage);
        const imageUrl = await getDownloadURL(imageRef);
        updatedProfile.image_url = imageUrl;
      }
      const profileRef = doc(firestore, 'user_profile', user.uid);
      await setDoc(profileRef, updatedProfile, { merge: true });
      setProfile(updatedProfile);
      setIsEditing(false);
      setNewImage(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <UserHeader />
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile.username || profile.first_name || 'User'}</h1>
            <p className="mt-1 text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-b border-gray-200 pb-5 flex justify-between items-center">
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <img
                    src={profile.image_url || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                  />
                  {isEditing && (
                    <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow">
                      <Upload className="h-5 w-5 text-gray-500" />
                    </label>
                  )}
                  <input
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.username || profile.first_name || 'User'}</h2>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>
              <button
                onClick={isEditing ? handleSave : toggleEditing}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
            
            <div className="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={profile.username || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={profile.first_name || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={profile.last_name || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profile.email || ''}
                  disabled={true}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 bg-gray-100"
                />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={profile.address || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin_url"
                  id="linkedin_url"
                  value={profile.linkedin_url || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">GitHub URL</label>
                <input
                  type="text"
                  name="github_url"
                  id="github_url"
                  value={profile.github_url || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfileManagement;