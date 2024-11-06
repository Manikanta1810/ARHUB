

// import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import UserHeader from '../../components/UserComponents/UserHeader';
// import { firestore, storage } from '../../firebase';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { useAuth } from '../../utils/AuthContext';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const DocumentItem = ({ category, name, date, pdfUrl, imageUrl, onOpen }) => (
//   <div className="bg-white p-4 rounded-lg shadow-md mb-2">
//     <div className="relative w-full h-32 mb-4">
//       <img 
//         src={imageUrl} 
//         alt={name} 
//         className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
//       />
//     </div>
//     <div className="text-xs text-gray-500">{category}</div>
//     <div className="font-semibold text-gray-800">{name}</div>
//     <div className="text-xs text-gray-500 mt-1">{date}</div>
//     <button 
//       className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
//       onClick={() => onOpen(pdfUrl)}
//     >
//       Open
//     </button>
//   </div>
// );

// const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-4 rounded-lg w-11/12 h-5/6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Document Viewer</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             Close
//           </button>
//         </div>
//         <iframe 
//           src={pdfUrl} 
//           className="w-full h-5/6" 
//           title="PDF Viewer"
//         />
//       </div>
//     </div>
//   );
// };

// const UserList = () => {
//   const { user } = useAuth();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [articleName, setArticleName] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [userResources, setUserResources] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentPdfUrl, setCurrentPdfUrl] = useState('');

//   useEffect(() => {
//     if (user) {
//       fetchUserResources();
//     }
//   }, [user]);

//   const fetchUserResources = async () => {
//     try {
//       const resourcesRef = collection(firestore, 'user_resources');
//       const q = query(resourcesRef, where("userEmail", "==", user.email));
//       const querySnapshot = await getDocs(q);
//       const resources = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setUserResources(resources);
//     } catch (error) {
//       console.error("Error fetching user resources:", error);
//       toast.error("Failed to fetch your resources");
//     }
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleArticleNameChange = (event) => {
//     setArticleName(event.target.value);
//   };

//   const handleImageUrlChange = (event) => {
//     setImageUrl(event.target.value);
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//   };

//   const handlePublish = async () => {
//     if (!selectedFile || !category || !articleName || !imageUrl) {
//       toast.error("Please fill all fields and select a file");
//       return;
//     }

//     try {
//       // Upload file to Firebase Storage
//       const storageRef = ref(storage, `user_resources/${user.email}/${selectedFile.name}`);
//       await uploadBytes(storageRef, selectedFile);
//       const pdfUrl = await getDownloadURL(storageRef);

//       // Add document to Firestore
//       const resourceData = {
//         userEmail: user.email,
//         category,
//         name: articleName,
//         imageUrl,
//         pdfUrl,
//         date: new Date().toISOString()
//       };

//       await addDoc(collection(firestore, 'user_resources'), resourceData);

//       toast.success("Resource published successfully!");
//       fetchUserResources(); // Refresh the list
//       // Reset form
//       setSelectedFile(null);
//       setCategory('');
//       setArticleName('');
//       setImageUrl('');
//     } catch (error) {
//       console.error("Error publishing resource:", error);
//       toast.error("Failed to publish resource");
//     }
//   };

//   const handleOpenPdf = (pdfUrl) => {
//     setCurrentPdfUrl(pdfUrl);
//     setModalOpen(true);
//   };

//   const currentDate = new Date().toLocaleDateString();

//   return (
//     <div>
//       <UserHeader />
//       <div className="flex min-h-screen bg-gray-100 p-4">
//         <div className="m-auto bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             {/* Left side */}
//             <div className="w-full md:w-2/3 p-8 space-y-6 overflow-y-auto max-h-[80vh]">
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload Document
//                 </label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//                 >
//                   Choose File
//                 </label>
//                 {selectedFile && (
//                   <div className="mt-4 flex items-center justify-center">
//                     <span className="text-sm text-gray-600">{selectedFile.name}</span>
//                     <button
//                       onClick={handleRemoveFile}
//                       className="ml-2 text-red-500 hover:text-red-700"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   value={category}
//                   onChange={handleCategoryChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="">Select a category</option>
//                   <option value="technology">Technology</option>
//                   <option value="science">Science</option>
//                   <option value="business">Business</option>
//                   <option value="health">Health</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Article Name
//                 </label>
//                 <input
//                   type="text"
//                   value={articleName}
//                   onChange={handleArticleNameChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter article name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Cover Image URL
//                 </label>
//                 <input
//                   type="text"
//                   value={imageUrl}
//                   onChange={handleImageUrlChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter cover image URL"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload Date
//                 </label>
//                 <input
//                   type="text"
//                   value={currentDate}
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
//                 />
//               </div>
//             </div>

//             {/* Vertical dashed line for larger screens */}
//             <div className="hidden md:block border-r border-dashed border-gray-300"></div>

//             {/* Right side */}
//             <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-8">
//               <button
//                 onClick={handlePublish}
//                 className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition duration-300"
//               >
//                 Publish
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* User's Shared Articles Section */}
//       <div className="container mx-auto px-4 py-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Shared Articles</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {userResources.map((doc, index) => (
//             <DocumentItem 
//               key={index} 
//               category={doc.category}
//               name={doc.name}
//               date={new Date(doc.date).toLocaleDateString()}
//               pdfUrl={doc.pdfUrl}
//               imageUrl={doc.imageUrl}
//               onOpen={handleOpenPdf}
//             />
//           ))}
//         </div>
//       </div>

//       <PDFModal 
//         isOpen={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//         pdfUrl={currentPdfUrl}
//       />

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//     </div>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import UserHeader from '../../components/UserComponents/UserHeader';
import { firestore, storage } from '../../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../utils/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../../contexts/ThemeContext';

const DocumentItem = ({ category, name, date, pdfUrl, imageUrl, onOpen }) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md mb-2`}>
      <div className="relative w-full h-32 mb-4">
        <img 
          src={imageUrl} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{category}</div>
      <div className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{name}</div>
      <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{date}</div>
      <button 
        className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
        onClick={() => onOpen(pdfUrl)}
      >
        Open
      </button>
    </div>
  );
};

const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
  const { isDarkTheme } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg w-11/12 h-5/6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Document Viewer</h2>
          <button 
            onClick={onClose}
            className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Close
          </button>
        </div>
        <iframe 
          src={pdfUrl} 
          className="w-full h-5/6" 
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

const UserList = () => {
  const { isDarkTheme } = useTheme();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [articleName, setArticleName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userResources, setUserResources] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserResources();
    }
  }, [user]);

  const fetchUserResources = async () => {
    try {
      const resourcesRef = collection(firestore, 'user_resources');
      const q = query(resourcesRef, where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);
      const resources = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserResources(resources);
    } catch (error) {
      console.error("Error fetching user resources:", error);
      toast.error("Failed to fetch your resources");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleArticleNameChange = (event) => {
    setArticleName(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handlePublish = async () => {
    if (!selectedFile || !category || !articleName || !imageUrl) {
      toast.error("Please fill all fields and select a file");
      return;
    }

    try {
      const storageRef = ref(storage, `user_resources/${user.email}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const pdfUrl = await getDownloadURL(storageRef);

      const resourceData = {
        userEmail: user.email,
        category,
        name: articleName,
        imageUrl,
        pdfUrl,
        date: new Date().toISOString()
      };

      await addDoc(collection(firestore, 'user_resources'), resourceData);

      toast.success("Resource published successfully!");
      fetchUserResources();
      setSelectedFile(null);
      setCategory('');
      setArticleName('');
      setImageUrl('');
    } catch (error) {
      console.error("Error publishing resource:", error);
      toast.error("Failed to publish resource");
    }
  };

  const handleOpenPdf = (pdfUrl) => {
    setCurrentPdfUrl(pdfUrl);
    setModalOpen(true);
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={isDarkTheme ? 'bg-gray-900' : 'bg-white'}>
      <UserHeader />
      <div className={`flex min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
        <div className={`m-auto ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg w-full max-w-4xl overflow-hidden`}>
          <div className="flex flex-col md:flex-row">
            {/* Left side */}
            <div className="w-full md:w-2/3 p-8 space-y-6 overflow-y-auto max-h-[80vh]">
              <div className={`border-2 border-dashed ${isDarkTheme ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-8 text-center`}>
                <label className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Upload Document
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Choose File
                </label>
                {selectedFile && (
                  <div className="mt-4 flex items-center justify-center">
                    <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedFile.name}
                    </span>
                    <button
                      onClick={handleRemoveFile}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDarkTheme 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="science">Science</option>
                  <option value="business">Business</option>
                  <option value="health">Health</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Article Name
                </label>
                <input
                  type="text"
                  value={articleName}
                  onChange={handleArticleNameChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDarkTheme 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                  placeholder="Enter article name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDarkTheme 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                  placeholder="Enter cover image URL"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Upload Date
                </label>
                <input
                  type="text"
                  value={currentDate}
                  readOnly
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDarkTheme 
                      ? 'bg-gray-600 border-gray-600 text-gray-300' 
                      : 'bg-gray-100 border-gray-300 text-gray-700'
                  }`}
                />
              </div>
            </div>

            {/* Vertical dashed line */}
            <div className={`hidden md:block border-r border-dashed ${
              isDarkTheme ? 'border-gray-600' : 'border-gray-300'
            }`}></div>

            {/* Right side */}
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-8">
              <button
                onClick={handlePublish}
                className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User's Shared Articles Section */}
      <div className={`container mx-auto px-4 py-12 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
          Your Shared Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {userResources.map((doc, index) => (
            <DocumentItem 
              key={index} 
              category={doc.category}
              name={doc.name}
              date={new Date(doc.date).toLocaleDateString()}
              pdfUrl={doc.pdfUrl}
              imageUrl={doc.imageUrl}
              onOpen={handleOpenPdf}
            />
          ))}
        </div>
      </div>

      <PDFModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        pdfUrl={currentPdfUrl}
      />

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        theme={isDarkTheme ? 'dark' : 'light'}
      />
    </div>
  );
};

export default UserList;