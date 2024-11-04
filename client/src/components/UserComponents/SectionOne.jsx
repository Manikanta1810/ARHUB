

// import React, { useState, useEffect } from 'react';
// import { firestore } from '../../firebase';
// import { collection, query, where, getDocs, limit } from 'firebase/firestore';

// const DocumentItem = ({ category, name, date, pdfUrl, onOpen }) => (
//   <div className="bg-white p-4 rounded-lg shadow-md mb-2">
//     <div className="relative w-full h-32 mb-4">
//       <div className="absolute inset-0 bg-blue-200 transform rotate-3">
//         <div className="absolute inset-0 bg-white m-2">
//           <div className="absolute top-2 left-2 w-12 h-12 border-2 border-purple-200"></div>
//           <div className="absolute top-4 left-16 right-2 h-2 bg-gray-200"></div>
//           <div className="absolute top-8 left-16 right-2 h-2 bg-gray-200"></div>
//           <div className="absolute top-12 left-2 right-2 h-2 bg-gray-200"></div>
//           <div className="absolute bottom-4 right-2 w-12 h-8 bg-purple-200"></div>
//         </div>
//       </div>
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

// const CategorySection = ({ title, documents, onOpenPdf }) => (
//   <div className="mb-8">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//       {documents.map((doc, index) => (
//         <DocumentItem 
//           key={index} 
//           {...doc} 
//           onOpen={onOpenPdf}
//         />
//       ))}
//     </div>
//   </div>
// );

// const formatDate = (dateField) => {
//   if (dateField && typeof dateField.toDate === 'function') {
//     // It's a Firestore Timestamp
//     return dateField.toDate().toLocaleDateString();
//   } else if (dateField instanceof Date) {
//     // It's a JavaScript Date object
//     return dateField.toLocaleDateString();
//   } else if (typeof dateField === 'string') {
//     // It's already a string, we'll assume it's in a valid date format
//     return dateField;
//   } else if (typeof dateField === 'number') {
//     // It's a timestamp in milliseconds
//     return new Date(dateField).toLocaleDateString();
//   }
//   // If it's none of the above, return a placeholder or the current date
//   return new Date().toLocaleDateString();
// };

// const SectionOne = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentPdfUrl, setCurrentPdfUrl] = useState('');
//   const [resources, setResources] = useState({
//     science: [],
//     technology: [],
//     business: [],
//     health: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       const categories = ['science', 'technology', 'business', 'health'];
//       const fetchedResources = {};

//       try {
//         for (const category of categories) {
//           const q = query(
//             collection(firestore, 'user_resources'),
//             where('category', '==', category),
//             limit(5)
//           );

//           const querySnapshot = await getDocs(q);
//           fetchedResources[category] = querySnapshot.docs.map(doc => {
//             const data = doc.data();
//             return {
//               id: doc.id,
//               ...data,
//               date: formatDate(data.date)
//             };
//           });
//         }
//         setResources(fetchedResources);
//       } catch (err) {
//         console.error("Error fetching resources:", err);
//         setError("Failed to load resources. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   const handleOpenPdf = (pdfUrl) => {
//     setCurrentPdfUrl(pdfUrl);
//     setModalOpen(true);
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading resources...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <CategorySection title="Science Resources" documents={resources.science} onOpenPdf={handleOpenPdf} />
//       <CategorySection title="Technology Resources" documents={resources.technology} onOpenPdf={handleOpenPdf} />
//       <CategorySection title="Business Resources" documents={resources.business} onOpenPdf={handleOpenPdf} />
//       <CategorySection title="Health Resources" documents={resources.health} onOpenPdf={handleOpenPdf} />
      
//       <PDFModal 
//         isOpen={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//         pdfUrl={currentPdfUrl}
//       />
//     </div>
//   );
// };

// export default SectionOne;

import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const DocumentItem = ({ category, name, date, pdfUrl, imageUrl, onOpen }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-2">
    <div className="relative w-full h-32 mb-4 overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
      ) : (
        <div className="absolute inset-0 bg-blue-200 transform rotate-3">
          <div className="absolute inset-0 bg-white m-2">
            <div className="absolute top-2 left-2 w-12 h-12 border-2 border-purple-200"></div>
            <div className="absolute top-4 left-16 right-2 h-2 bg-gray-200"></div>
            <div className="absolute top-8 left-16 right-2 h-2 bg-gray-200"></div>
            <div className="absolute top-12 left-2 right-2 h-2 bg-gray-200"></div>
            <div className="absolute bottom-4 right-2 w-12 h-8 bg-purple-200"></div>
          </div>
        </div>
      )}
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

const CategorySection = ({ title, documents, onOpenPdf }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

const formatDate = (dateField) => {
  if (dateField && typeof dateField.toDate === 'function') {
    // It's a Firestore Timestamp
    return dateField.toDate().toLocaleDateString();
  } else if (dateField instanceof Date) {
    // It's a JavaScript Date object
    return dateField.toLocaleDateString();
  } else if (typeof dateField === 'string') {
    // It's already a string, we'll assume it's in a valid date format
    return dateField;
  } else if (typeof dateField === 'number') {
    // It's a timestamp in milliseconds
    return new Date(dateField).toLocaleDateString();
  }
  // If it's none of the above, return a placeholder or the current date
  return new Date().toLocaleDateString();
};

const SectionOne = () => {
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
              imageUrl: data.imageUrl || '' // Ensure imageUrl is included
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
    return <div className="text-center py-10">Loading resources...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <CategorySection title="Science Resources" documents={resources.science} onOpenPdf={handleOpenPdf} />
      <CategorySection title="Technology Resources" documents={resources.technology} onOpenPdf={handleOpenPdf} />
      <CategorySection title="Business Resources" documents={resources.business} onOpenPdf={handleOpenPdf} />
      <CategorySection title="Health Resources" documents={resources.health} onOpenPdf={handleOpenPdf} />
      
      <PDFModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        pdfUrl={currentPdfUrl}
      />
    </div>
  );
};

export default SectionOne;