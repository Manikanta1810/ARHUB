import React, { useState } from 'react';

const DocumentItem = ({ category, name, date, pdfUrl, onOpen }) => (
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
    <button 
      className="mt-2 px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
      onClick={() => onOpen(pdfUrl)}
    >
      Open
    </button>
  </div>
);

const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-11/12 h-5/6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Document Viewer</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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

const SectionTwo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');

  const documents = [
    { 
      category: 'Educational Technology', 
      name: 'Emerging Trends in EdTech 2023', 
      date: 'October 15, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf'
    },
    { 
      category: 'Inclusive Learning', 
      name: 'Best Practices for Diverse Classrooms', 
      date: 'October 1, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf'
    },
    { 
      category: 'STEM Education', 
      name: 'Integrating Coding in K-12 Curriculum', 
      date: 'September 25, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf'
    },
    { 
      category: 'Mental Health', 
      name: 'Supporting Student Well-being Post-Pandemic', 
      date: 'October 8, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf'
    },
    { 
      category: 'Assessment Strategies', 
      name: 'Beyond Standardized Testing: New Approaches', 
      date: 'October 3, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf'
    },
  ];

  const handleOpenPdf = (pdfUrl) => {
    setCurrentPdfUrl(pdfUrl);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 mt-9 mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending in ARHUB</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {documents.map((doc, index) => (
          <DocumentItem 
            key={index} 
            {...doc} 
            onOpen={handleOpenPdf}
          />
        ))}
      </div>
      <PDFModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        pdfUrl={currentPdfUrl}
      />
    </div>
  );
};

export default SectionTwo;