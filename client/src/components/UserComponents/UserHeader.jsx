// import React, { useState, useEffect } from 'react';
// import { Search, ChevronDown, Loader, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../utils/AuthContext';
// import { firestore } from '../../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { useTheme } from '../../contexts/ThemeContext';

// const UserHeader = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   // const [isDarkTheme, setIsDarkTheme] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const { isDarkTheme, toggleTheme } = useTheme();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//   // const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setLoading(true);
//     try {
//       const searchResults = [];
//       const queryLower = query.toLowerCase();

//       // Search in news articles
//       const newsRef = collection(firestore, 'news_articles');
//       const newsSnapshot = await getDocs(newsRef);
//       newsSnapshot.forEach(doc => {
//         const data = doc.data();
//         if (
//           data.title?.toLowerCase().includes(queryLower) ||
//           data.description?.toLowerCase().includes(queryLower)
//         ) {
//           searchResults.push({
//             id: doc.id,
//             type: 'news',
//             title: data.title,
//             description: data.description,
//             linkUrl: data.linkUrl
//           });
//         }
//       });

//       // Search in assistive technologies
//       const datRef = collection(firestore, 'assistive_technologies');
//       const datSnapshot = await getDocs(datRef);
//       datSnapshot.forEach(doc => {
//         const data = doc.data();
//         if (
//           data.title?.toLowerCase().includes(queryLower) ||
//           data.description?.toLowerCase().includes(queryLower) ||
//           data.category?.toLowerCase().includes(queryLower)
//         ) {
//           searchResults.push({
//             id: doc.id,
//             type: 'technology',
//             title: data.title,
//             description: data.description,
//             category: data.category,
//             linkText: data.linkText
//           });
//         }
//       });

//       setSearchResults(searchResults);
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   const handleResultClick = (result) => {
//     setShowResults(false);
//     setSearchQuery('');
    
//     if (result.type === 'news') {
//       window.open(result.linkUrl, '_blank');
//     } else if (result.type === 'technology') {
//       window.open(result.linkText, '_blank');
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case 'news':
//         return '📰';
//       case 'technology':
//         return '💻';
//       default:
//         return '📄';
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/');
//     } catch (error) {
//       console.log("logout functionality failed");
//     }
//   };

//   return (
//     <header className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between py-2">
//           <img src="/arhub_logo.png" alt="AR HUB Logo" className="h-14" />
//           <nav className="flex-1 flex justify-center space-x-6">
//             <a href="/home" className="hover:text-gray-300">Home</a>
//             <a href="/news" className="hover:text-gray-300">News</a>
//             <a href="/discussion" className="hover:text-gray-300">Discussions</a>
//             <a href="/dat" className="hover:text-gray-300">DA Tech's</a>
//             <a href="/arbot" className="hover:text-gray-300">AR BOT</a>
//             <a href="/feedback" className="hover:text-gray-300">Feedback</a>
//           </nav>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     id="theme-toggle"
//                     className="sr-only"
//                     checked={isDarkTheme}
//                     onChange={toggleTheme}
//                   />
//                   <div className={`block w-14 h-8 rounded-full ${isDarkTheme ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
//                   <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${isDarkTheme ? 'transform translate-x-6' : ''}`}></div>
//                 </div>
//                 <span className="ml-3 text-sm font-medium">
//                   {isDarkTheme ? 'Dark' : 'Light'} Theme
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={`border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex-grow mx-4">
//               <div className="relative max-w-2xl mx-auto">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value);
//                     setShowResults(true);
//                   }}
//                   placeholder="Search for news, technologies..."
//                   className={`w-full pl-10 pr-10 py-2 rounded-full ${
//                     isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
//                   }`}
//                   onFocus={() => setShowResults(true)}
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                 {searchQuery && (
//                   <button 
//                     onClick={() => {
//                       setSearchQuery('');
//                       setSearchResults([]);
//                     }}
//                     className="absolute right-3 top-2.5"
//                   >
//                     <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   </button>
//                 )}

//                 {showResults && (searchQuery || loading) && (
//                   <div className={`absolute w-full mt-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50`}>
//                     {loading && (
//                       <div className="flex items-center justify-center p-4">
//                         <Loader className="w-6 h-6 animate-spin text-blue-500" />
//                       </div>
//                     )}

//                     {!loading && searchResults.length === 0 && searchQuery && (
//                       <div className="p-4 text-center text-gray-500">
//                         No results found for "{searchQuery}"
//                       </div>
//                     )}

//                     {!loading && searchResults.map((result) => (
//                       <button
//                         key={`${result.type}-${result.id}`}
//                         onClick={() => handleResultClick(result)}
//                         className={`w-full text-left p-4 border-b last:border-b-0 flex items-start gap-3 ${
//                           isDarkTheme 
//                             ? 'hover:bg-gray-600 border-gray-600' 
//                             : 'hover:bg-gray-50 border-gray-200'
//                         }`}
//                       >
//                         <span className="text-2xl">{getTypeIcon(result.type)}</span>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <h3 className={`font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
//                               {result.title}
//                             </h3>
//                             <span className={`text-xs px-2 py-1 ${
//                               isDarkTheme ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-600'
//                             } rounded-full`}>
//                               {result.type === 'news' ? 'External Link' : 'Technology'}
//                             </span>
//                           </div>
//                           {result.description && (
//                             <p className={`text-sm mt-1 line-clamp-2 ${
//                               isDarkTheme ? 'text-gray-300' : 'text-gray-600'
//                             }`}>
//                               {result.description}
//                             </p>
//                           )}
//                           {result.category && (
//                             <p className={`text-xs mt-1 ${
//                               isDarkTheme ? 'text-gray-400' : 'text-gray-500'
//                             }`}>
//                               Category: {result.category}
//                             </p>
//                           )}
//                           <div className={`text-xs mt-1 ${
//                             isDarkTheme ? 'text-blue-400' : 'text-blue-500'
//                           }`}>
//                             {result.type === 'news' ? 'Opens in new tab →' : 'View details →'}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="flex items-center space-x-2 focus:outline-none"
//               >
//                 <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center">
//                   <span className="text-white font-semibold">A</span>
//                 </div>
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//               {isDropdownOpen && (
//                 <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
//                   isDarkTheme ? 'bg-gray-700' : 'bg-white'
//                 } ring-1 ring-black ring-opacity-5`} style={{zIndex:'999999'}}>
//                   <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                     <a href="/profile" className={`block px-4 py-2 text-sm ${isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Profile</a>
//                     <a href="/mylist" className={`block px-4 py-2 text-sm ${isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">My List</a>
//                     <a 
//                       onClick={handleLogout}
//                       className={`block px-4 py-2 text-sm ${isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'} cursor-pointer`} 
//                       role="menuitem"
//                     >
//                       Logout
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default UserHeader;

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Loader, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useTheme } from '../../contexts/ThemeContext';

const UserHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = [];
      const queryLower = query.toLowerCase();

      // Search in news articles
      const newsRef = collection(firestore, 'news_articles');
      const newsSnapshot = await getDocs(newsRef);
      newsSnapshot.forEach(doc => {
        const data = doc.data();
        if (
          data.title?.toLowerCase().includes(queryLower) ||
          data.description?.toLowerCase().includes(queryLower)
        ) {
          searchResults.push({
            id: doc.id,
            type: 'news',
            title: data.title,
            description: data.description,
            linkUrl: data.linkUrl
          });
        }
      });

      // Search in assistive technologies
      const datRef = collection(firestore, 'assistive_technologies');
      const datSnapshot = await getDocs(datRef);
      datSnapshot.forEach(doc => {
        const data = doc.data();
        if (
          data.title?.toLowerCase().includes(queryLower) ||
          data.description?.toLowerCase().includes(queryLower) ||
          data.category?.toLowerCase().includes(queryLower)
        ) {
          searchResults.push({
            id: doc.id,
            type: 'technology',
            title: data.title,
            description: data.description,
            category: data.category,
            linkText: data.linkText
          });
        }
      });

      setSearchResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    
    if (result.type === 'news') {
      window.open(result.linkUrl, '_blank');
    } else if (result.type === 'technology') {
      window.open(result.linkText, '_blank');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'news':
        return '📰';
      case 'technology':
        return '💻';
      default:
        return '📄';
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log("logout functionality failed");
    }
  };

  return (
    <header className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <img src="/arhub_logo.png" alt="AR HUB Logo" className="h-14" />
          <nav className="flex-1 flex justify-center space-x-6">
            <a href="/home" className={`hover:text-gray-300 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Home</a>
            <a href="/news" className={`hover:text-gray-300 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>News</a>
            <a href="/discussion" className={`hover:text-gray-300 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Discussions</a>
            <a href="/dat" className={`hover:text-gray-300 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>DA Tech's</a>
            <a href='/aboutus' className={`hover:text-gray-300 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>About Us</a>
            <a href="/feedback" className={`hover:text-gray-300 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Feedback</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="theme-toggle"
                    className="sr-only"
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                  />
                  <div className={`block w-14 h-8 rounded-full ${isDarkTheme ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${isDarkTheme ? 'transform translate-x-6' : ''}`}></div>
                </div>
                <span className={`ml-3 text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                  {isDarkTheme ? 'Dark' : 'Light'} Theme
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-grow mx-4">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  placeholder="Search for news, technologies..."
                  className={`w-full pl-10 pr-10 py-2 rounded-full ${
                    isDarkTheme ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                  }`}
                  onFocus={() => setShowResults(true)}
                />
                <Search className={`absolute left-3 top-2.5 h-5 w-5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="absolute right-3 top-2.5"
                  >
                    <X className={`h-5 w-5 ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} />
                  </button>
                )}

                {showResults && (searchQuery || loading) && (
                  <div className={`absolute w-full mt-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border ${isDarkTheme ? 'border-gray-600' : 'border-gray-200'} max-h-96 overflow-y-auto z-50`}>
                    {loading && (
                      <div className="flex items-center justify-center p-4">
                        <Loader className="w-6 h-6 animate-spin text-blue-500" />
                      </div>
                    )}

                    {!loading && searchResults.length === 0 && searchQuery && (
                      <div className={`p-4 text-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                        No results found for "{searchQuery}"
                      </div>
                    )}

                    {!loading && searchResults.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleResultClick(result)}
                        className={`w-full text-left p-4 border-b last:border-b-0 flex items-start gap-3 ${
                          isDarkTheme 
                            ? 'hover:bg-gray-600 border-gray-600' 
                            : 'hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        <span className="text-2xl">{getTypeIcon(result.type)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                              {result.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 ${
                              isDarkTheme ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-600'
                            } rounded-full`}>
                              {result.type === 'news' ? 'External Link' : 'Technology'}
                            </span>
                          </div>
                          {result.description && (
                            <p className={`text-sm mt-1 line-clamp-2 ${
                              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {result.description}
                            </p>
                          )}
                          {result.category && (
                            <p className={`text-xs mt-1 ${
                              isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              Category: {result.category}
                            </p>
                          )}
                          <div className={`text-xs mt-1 ${
                            isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                          }`}>
                            {result.type === 'news' ? 'Opens in new tab →' : 'View details →'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative dropdown-container">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <ChevronDown className={`h-4 w-4 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`} />
              </button>

              {isDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                  isDarkTheme ? 'bg-gray-700' : 'bg-white'
                } ring-1 ring-black ring-opacity-5`} style={{zIndex:'999999'}}>
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a 
                      href="/profile" 
                      className={`block px-4 py-2 text-sm ${
                        isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                      }`} 
                      role="menuitem"
                    >
                      Profile
                    </a>
                    <a 
                      href="/mylist" 
                      className={`block px-4 py-2 text-sm ${
                        isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                      }`} 
                      role="menuitem"
                    >
                      My List
                    </a>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;