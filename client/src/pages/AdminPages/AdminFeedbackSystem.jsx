// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
// import axios from 'axios';

// const FeedbackTable = ({ feedbacks, currentPage, itemsPerPage, onPageChange }) => {
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead className="bg-[#995c00]">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Username</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Message</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentItems.map((feedback, index) => (
//             <tr key={feedback.id}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.username}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {feedback.feedback}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.rating}/5</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };



// const AdminFeedbackSystem = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/admin/feedback');
//         setFeedbacks(response.data.data);
//         console.log(response.data.data);
//       } catch (error) {
//         console.error('Error fetching feedback:', error);
//       }
//     };

//     fetchFeedback();
//   }, []);

//   const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6 mt-10">Feedback Management</h1>
//       {feedbacks.length > 0 ? (
//         <>
//           <FeedbackTable
//             feedbacks={feedbacks}
//             currentPage={currentPage}
//             itemsPerPage={itemsPerPage}
//             onPageChange={handlePageChange}
//           />
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </>
//       ) : (
//         <p>No feedback available.</p>
//       )}
//     </div>
//   );
// };

// export default AdminFeedbackSystem;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { firestore } from '../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

const FeedbackTable = ({ feedbacks, currentPage, itemsPerPage, onPageChange }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-[#995c00]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((feedback, index) => (
            <tr key={feedback.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {feedback.feedback}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.rating}/5</td>
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
const AdminFeedbackSystem = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackQuery = query(collection(firestore, 'feedback_data'));
        const feedbackSnapshot = await getDocs(feedbackQuery);
        const feedbackData = feedbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 mt-10">Feedback Management</h1>
      {feedbacks.length > 0 ? (
        <>
          <FeedbackTable
            feedbacks={feedbacks}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default AdminFeedbackSystem;