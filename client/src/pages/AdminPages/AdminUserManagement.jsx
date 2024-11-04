


// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { firestore } from '../../firebase';
// import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';

// const UserResourceTable = ({ users, currentPage, itemsPerPage, onPageChange, onToggleActivation }) => {
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead className="bg-[#995c00]">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Username</th>
//             {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Resources Shared</th> */}
//             <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentItems.map((user, index) => (
//             <tr key={user.id}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
//               {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.resourcesShared || 0}</td> */}
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   onClick={() => onToggleActivation(user.id, user.isActive)}
//                   className={`${
//                     user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
//                   } text-white font-bold py-2 px-4 rounded`}
//                 >
//                   {user.isActive ? 'Deactivate' : 'Activate'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between sm:hidden">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Next
//         </button>
//       </div>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Showing page <span className="font-medium">{currentPage}</span> of{' '}
//             <span className="font-medium">{totalPages}</span>
//           </p>
//         </div>
//         <div>
//           <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//             <button
//               onClick={() => onPageChange(1)}
//               disabled={currentPage === 1}
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">First</span>
//               <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
//             </button>
//             <button
//               onClick={() => onPageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Previous</span>
//               <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//             </button>
//             <button
//               onClick={() => onPageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Next</span>
//               <ChevronRight className="h-5 w-5" aria-hidden="true" />
//             </button>
//             <button
//               onClick={() => onPageChange(totalPages)}
//               disabled={currentPage === totalPages}
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Last</span>
//               <ChevronsRight className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdminUserManagement = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [users, setUsers] = useState([]);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersQuery = query(collection(firestore, 'users'));
//         const usersSnapshot = await getDocs(usersQuery);
//         const usersData = usersSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           isActive: doc.data().isActive !== false // default to true if not set
//         }));
//         setUsers(usersData);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         toast.error('Failed to fetch users');
//       }
//     };

//     fetchUsers();
//   }, []);

//   const totalPages = Math.ceil(users.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleToggleActivation = async (userId, currentStatus) => {
//     try {
//       const userRef = doc(firestore, 'users', userId);
//       await updateDoc(userRef, {
//         isActive: !currentStatus
//       });

//       setUsers(prevUsers => 
//         prevUsers.map(user => 
//           user.id === userId 
//             ? { ...user, isActive: !currentStatus } 
//             : user
//         )
//       );
      
//       const updatedUser = users.find(user => user.id === userId);
//       if (updatedUser) {
//         const action = currentStatus ? 'deactivated' : 'activated';
//         toast.success(`User ${updatedUser.username} has been ${action} successfully!`);
//       }
//     } catch (error) {
//       console.error('Error toggling user activation:', error);
//       toast.error('Failed to update user status');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6 mt-10">User Resource Management</h1>
//       <UserResourceTable
//         users={users}
//         currentPage={currentPage}
//         itemsPerPage={itemsPerPage}
//         onPageChange={handlePageChange}
//         onToggleActivation={handleToggleActivation}
//       />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//     </div>
//   );
// };

// export default AdminUserManagement;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from '../../firebase';
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';

const UserResourceTable = ({ users, currentPage, itemsPerPage, onPageChange, onToggleActivation }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-[#995c00]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username || user.displayName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onToggleActivation(user.id, user.isActive, user.userType)}
                  className={`${
                    user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">First</span>
              <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Last</span>
              <ChevronsRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const AdminUserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(firestore, 'users'));
        const googleUsersQuery = query(collection(firestore, 'google_users'));
        const [usersSnapshot, googleUsersSnapshot] = await Promise.all([
          getDocs(usersQuery),
          getDocs(googleUsersQuery)
        ]);
        
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          isActive: doc.data().isActive !== false, // default to true if not set
          userType: 'regular'
        }));
        
        const googleUsersData = googleUsersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          isActive: doc.data().isActive !== false, // default to true if not set
          userType: 'google'
        }));

        setUsers([...usersData, ...googleUsersData]);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleActivation = async (userId, currentStatus, userType) => {
    try {
      const userRef = doc(firestore, userType === 'google' ? 'google_users' : 'users', userId);
      await updateDoc(userRef, {
        isActive: !currentStatus
      });

      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, isActive: !currentStatus } 
            : user
        )
      );
      
      const updatedUser = users.find(user => user.id === userId);
      if (updatedUser) {
        const action = currentStatus ? 'deactivated' : 'activated';
        toast.success(`User ${updatedUser.username || updatedUser.displayName} has been ${action} successfully!`);
      }
    } catch (error) {
      console.error('Error toggling user activation:', error);
      toast.error('Failed to update user status');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 mt-10">User Resource Management</h1>
      <UserResourceTable
        users={users}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onToggleActivation={handleToggleActivation}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AdminUserManagement;