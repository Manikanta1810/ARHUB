

import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useTheme } from '../../contexts/ThemeContext';

const DocumentItem = ({ category, name, date, pdfUrl, imageUrl, onOpen }) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md h-full`}>
      <div className="relative w-full h-32 mb-4 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="absolute inset-0 bg-blue-200 transform rotate-3">
            <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} m-2`}>
              <div className="absolute top-2 left-2 w-12 h-12 border-2 border-purple-200"></div>
              <div className={`absolute top-4 left-16 right-2 h-2 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
              <div className={`absolute top-8 left-16 right-2 h-2 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
              <div className={`absolute top-12 left-2 right-2 h-2 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
              <div className="absolute bottom-4 right-2 w-12 h-8 bg-purple-200"></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-144px)]">
        <div>
          <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{category}</div>
          <div className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'} mt-1`}>{name}</div>
          <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{date}</div>
        </div>
        <button 
          className={`mt-4 w-full px-4 py-2 text-white text-sm rounded-md transition-colors ${
            isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#cc7a00] hover:bg-blue-600'
          }`}
          onClick={() => onOpen(pdfUrl)}
        >
          Open
        </button>
      </div>
    </div>
  );
};

const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
  const { isDarkTheme } = useTheme();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg w-11/12 h-[90vh]`}>
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
          className="w-full h-[calc(100%-3rem)]" 
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

const CategorySection = ({ title, documents, onOpenPdf }) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className="mb-8 last:mb-0">
      <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {documents.map((doc, index) => (
          <DocumentItem 
            key={index} 
            {...doc} 
            onOpen={onOpenPdf}
          />
        ))}
      </div>
    </div>
  );
};

// Keep the formatDate function the same
const formatDate = (dateField) => {
  if (dateField && typeof dateField.toDate === 'function') {
    return dateField.toDate().toLocaleDateString();
  } else if (dateField instanceof Date) {
    return dateField.toLocaleDateString();
  } else if (typeof dateField === 'string') {
    return dateField;
  } else if (typeof dateField === 'number') {
    return new Date(dateField).toLocaleDateString();
  }
  return new Date().toLocaleDateString();
};

const SectionOne = () => {
  const { isDarkTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');
  const [resources, setResources] = useState({
    science: [],
    technology: [],
    business: [],
    health: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep the exact same useEffect and fetchResources logic
  useEffect(() => {
    const fetchResources = async () => {
      const categories = ['science', 'technology', 'business', 'health'];
      const fetchedResources = {};

      try {
        for (const category of categories) {
          const q = query(
            collection(firestore, 'user_resources'),
            where('category', '==', category),
            limit(5)
          );

          const querySnapshot = await getDocs(q);
          fetchedResources[category] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              date: formatDate(data.date),
              imageUrl: data.imageUrl || ''
            };
          });
        }
        setResources(fetchedResources);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleOpenPdf = (pdfUrl) => {
    setCurrentPdfUrl(pdfUrl);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-[200px] ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
        Loading resources...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className={`${isDarkTheme ? 'bg-gray-900' : 'bg-white'} py-8`}>
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <CategorySection title="Science Resources" documents={resources.science} onOpenPdf={handleOpenPdf} />
          <CategorySection title="Technology Resources" documents={resources.technology} onOpenPdf={handleOpenPdf} />
          <CategorySection title="Business Resources" documents={resources.business} onOpenPdf={handleOpenPdf} />
          <CategorySection title="Health Resources" documents={resources.health} onOpenPdf={handleOpenPdf} />
        </div>
        
        <PDFModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          pdfUrl={currentPdfUrl}
        />
      </div>
    </div>
  );
};

export default SectionOne;