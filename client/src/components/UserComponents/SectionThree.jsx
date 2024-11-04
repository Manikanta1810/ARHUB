import React, { useState } from 'react';

const DocumentItem = ({ category, name, date, pdfUrl, imageUrl, onOpen }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-2">
    <div className="relative w-full h-32 mb-4">
      <img 
        src={imageUrl} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
      />
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

const SectionThree = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');

  const documents = [
    { 
      category: 'Machine Learning', 
      name: 'AI-Powered Personalized Learning Pathways', 
      date: 'October 20, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s'
    },
    { 
      category: 'Natural Language Processing', 
      name: 'Chatbots as Teaching Assistants', 
      date: 'October 18, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6grLVXJ8urLdHBRlAgUfovtkNTQ75URfRQg&s'
    },
    { 
      category: 'Computer Vision', 
      name: 'AI in Classroom Behavior Analysis', 
      date: 'October 15, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-M_r7bEyuBQzUODeKwobumjZ2bnoB_uelw&s'
    },
    { 
      category: 'Predictive Analytics', 
      name: 'Early Warning Systems for Student Success', 
      date: 'October 12, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf',
      imageUrl: 'https://d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2023/07/13220529/Artificial-Intelligence-in-Indonesia-The-current-state-and-its-opportunities.jpeg'
    },
    { 
      category: 'Robotics', 
      name: 'AI Robots in Special Education', 
      date: 'October 10, 2023',
      pdfUrl: 'https://files.eric.ed.gov/fulltext/EJ1172284.pdf',
      imageUrl: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg'
    },
  ];

  const handleOpenPdf = (pdfUrl) => {
    setCurrentPdfUrl(pdfUrl);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 mt-9 mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Artificial Intelligence</h2>
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

export default SectionThree;