/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const UserResourceTable = ({ users, currentPage, itemsPerPage, onPageChange, onDeactivate }) => {
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
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Resources Shared</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.resourcesShared}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onDeactivate(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Deactivate
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
  const itemsPerPage = 10;

  // Mock data - replace this with actual data fetching logic
  const users = [
    { id: 1, username: "user1", resourcesShared: 15 },
    { id: 2, username: "user2", resourcesShared: 7 },
    { id: 3, username: "user3", resourcesShared: 22 },
    { id: 4, username: "user4", resourcesShared: 5 },
    { id: 5, username: "user5", resourcesShared: 18 },
    { id: 6, username: "user6", resourcesShared: 9 },
    { id: 7, username: "user7", resourcesShared: 13 },
    { id: 8, username: "user8", resourcesShared: 3 },
    { id: 9, username: "user9", resourcesShared: 11 },
    { id: 10, username: "user10", resourcesShared: 6 },
    { id: 11, username: "user11", resourcesShared: 20 },
    { id: 12, username: "user12", resourcesShared: 8 },
    // ... add more mock data as needed
  ];

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeactivate = (userId) => {
    // Implement deactivation logic here
    console.log(`Deactivate user with ID: ${userId}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 mt-10">User Resource Management</h1>
      <UserResourceTable
        users={users}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onDeactivate={handleDeactivate}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminUserManagement;