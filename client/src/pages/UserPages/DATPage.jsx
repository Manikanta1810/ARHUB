// import React, { useState, useEffect } from 'react';
// import UserHeader from '../../components/UserComponents/UserHeader';
// import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from '../../firebase';
// import { Loader2, ExternalLink, Filter } from 'lucide-react';

// const categories = [
//   'All',
//   'Screen Readers',
//   'Webdesign Helper',
//   'Audio Books',
//   'Talking Calculator',
//   'Text to Speech Software',
//   'Other'
// ];

// const DATPage = () => {
//   const [technologies, setTechnologies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   useEffect(() => {
//     const fetchTechnologies = async () => {
//       try {
//         const techRef = collection(firestore, 'assistive_technologies');
//         const snapshot = await getDocs(techRef);
//         const techData = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setTechnologies(techData);
//       } catch (err) {
//         console.error('Error fetching technologies:', err);
//         setError('Failed to load assistive technologies');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTechnologies();
//   }, []);

//   const filteredTechnologies = technologies.filter(tech => 
//     selectedCategory === 'All' ? true : tech.category === selectedCategory
//   );

//   if (loading) {
//     return (
//       <div>
//         <UserHeader />
//         <div className="min-h-screen flex items-center justify-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <UserHeader />
//         <div className="min-h-screen flex items-center justify-center text-red-500">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <UserHeader />
      
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
//             Directory of Assistive Technologies
//           </h1>
          
//           {/* Mobile Filter Button */}
//           <button 
//             className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//           >
//             <Filter className="w-4 h-4" />
//             Filter
//           </button>

//           {/* Desktop Filter */}
//           <div className="hidden md:flex gap-2">
//             {categories.map(category => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   selectedCategory === category
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Filter Panel */}
//         {isFilterOpen && (
//           <div className="md:hidden flex flex-wrap gap-2 mb-6">
//             {categories.map(category => (
//               <button
//                 key={category}
//                 onClick={() => {
//                   setSelectedCategory(category);
//                   setIsFilterOpen(false);
//                 }}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   selectedCategory === category
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTechnologies.map(tech => (
//             <div
//               key={tech.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
//             >
//               <div className="relative h-48">
//                 <img
//                   src={tech.coverImageUrl}
//                   alt={tech.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.src = '/api/placeholder/400/320';
//                     e.target.alt = 'Image not available';
//                   }}
//                 />
//                 <div className="absolute top-4 right-4">
//                   <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
//                     {tech.category}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {tech.title}
//                 </h3>
                
//                 <p className="text-gray-600 mb-4 line-clamp-3">
//                   {tech.description}
//                 </p>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">
//                     {new Date(tech.uploadDate).toLocaleDateString()}
//                   </span>
                  
//                   <a
//                     href={tech.linkText}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
//                   >
//                     Learn More
//                     <ExternalLink className="w-4 h-4" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredTechnologies.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">
//               No assistive technologies found in this category.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DATPage;
import React, { useState, useEffect } from 'react';
import UserHeader from '../../components/UserComponents/UserHeader';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { Loader2, ExternalLink, Filter } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const categories = [
  'All',
  'Screen Readers',
  'Webdesign Helper',
  'Audio Books',
  'Talking Calculator',
  'Text to Speech Software',
  'Other'
];

const DATPage = () => {
  const { isDarkTheme } = useTheme();
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const techRef = collection(firestore, 'assistive_technologies');
        const snapshot = await getDocs(techRef);
        const techData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTechnologies(techData);
      } catch (err) {
        console.error('Error fetching technologies:', err);
        setError('Failed to load assistive technologies');
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  const filteredTechnologies = technologies.filter(tech => 
    selectedCategory === 'All' ? true : tech.category === selectedCategory
  );

  if (loading) {
    return (
      <div className={isDarkTheme ? 'bg-gray-900' : 'bg-white'}>
        <UserHeader />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={isDarkTheme ? 'bg-gray-900' : 'bg-white'}>
        <UserHeader />
        <div className="min-h-screen flex items-center justify-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkTheme ? 'bg-gray-900' : 'bg-white'}>
      <UserHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold mb-4 md:mb-0 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}>
            Directory of Assistive Technologies
          </h1>
          
          {/* Mobile Filter Button */}
          <button 
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>

          {/* Desktop Filter */}
          <div className="hidden md:flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : isDarkTheme 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isFilterOpen && (
          <div className="md:hidden flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsFilterOpen(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : isDarkTheme
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnologies.map(tech => (
            <div
              key={tech.id}
              className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                isDarkTheme ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="relative h-48">
                <img
                  src={tech.coverImageUrl}
                  alt={tech.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/320';
                    e.target.alt = 'Image not available';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {tech.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}>
                  {tech.title}
                </h3>
                
                <p className={`mb-4 line-clamp-3 ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {tech.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {new Date(tech.uploadDate).toLocaleDateString()}
                  </span>
                  
                  <a
                    href={tech.linkText}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-medium ${
                      isDarkTheme
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTechnologies.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No assistive technologies found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DATPage;