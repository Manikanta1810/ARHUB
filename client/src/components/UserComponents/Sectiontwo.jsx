/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const DocumentItem = ({ category, name, date }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-2">
    <div className="relative w-full h-32 mb-4">
      <div className="absolute inset-0 bg-blue-200 transform rotate-3">
        <div className="absolute inset-0 bg-white m-2">
          <div className="absolute top-2 left-2 w-12 h-12 border-2 border-purple-200"></div>
          <div className="absolute top-4 left-16 right-2 h-2 bg-gray-200"></div>
          <div className="absolute top-8 left-16 right-2 h-2 bg-gray-200"></div>
          <div className="absolute top-12 left-2 right-2 h-2 bg-gray-200"></div>
          <div className="absolute bottom-4 right-2 w-12 h-8 bg-purple-200"></div>
        </div>
      </div>
    </div>
    <div className="text-xs text-gray-500">{category}</div>
    <div className="font-semibold text-gray-800">{name}</div>
    <div className="text-xs text-gray-500 mt-1">{date}</div>
    <button className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors">
      Open
    </button>
  </div>
);

const SectionTwo = () => {
  const documents = [
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
  ];

  return (
    <div className="container mx-auto px-4 mt-9 mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending in ARHUB</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {documents.map((doc, index) => (
          <DocumentItem key={index} {...doc} />
        ))}
      </div>
    </div>
  );
};

export default SectionTwo;