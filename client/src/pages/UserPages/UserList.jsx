import React, { useState } from 'react';
import { X } from 'lucide-react';
import UserHeader from '../../components/UserComponents/UserHeader';

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

const SectionOne = () => {
  const documents = [
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
    { category: 'Category', name: 'Name', date: 'Date of Publication' },
  ];

  return (
    <div className="container mx-auto px-4 mt-12 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Shared Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {documents.map((doc, index) => (
          <DocumentItem key={index} {...doc} />
        ))}
      </div>
    </div>
  );
};

const UserList = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [articleName, setArticleName] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleArticleNameChange = (event) => {
    setArticleName(event.target.value);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handlePublish = () => {
    console.log('Publishing article...');
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <UserHeader />
      <div className="flex h-screen bg-gray-100">
        <div className="m-auto bg-white rounded-lg shadow-lg w-4/5 h-4/5 flex">
          {/* Left side */}
          <div className="w-2/3 p-8 space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-20 text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <span className="text-sm text-gray-600">{selectedFile.name}</span>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article Name
              </label>
              <input
                type="text"
                value={articleName}
                onChange={handleArticleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter article name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Date
              </label>
              <input
                type="text"
                value={currentDate}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Vertical dashed line */}
          <div className="border-r border-dashed border-gray-300"></div>

          {/* Right side */}
          <div className="w-1/3 flex flex-col justify-center items-center p-8">
            <button
              onClick={handlePublish}
              className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
      <SectionOne />
    </div>
  );
};

export default UserList;