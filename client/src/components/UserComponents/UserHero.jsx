// /* eslint-disable no-unused-vars */
// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// export default function UserHero() {
//   return (
//     <div className="relative bg-gradient-to-r from-black to-white-600 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
//           <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
//             <div className="sm:text-center lg:text-left">
//               <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
//                 <span className="block xl:inline">Welcome to</span>{' '}
//                 <span className="block text-yellow-400 xl:inline">AR HUB</span>
//               </h1>
//               <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
//               Discover inclusive design solutions, collaborate with accessibility experts, and stay informed about the latest in adaptive techs. Your gateway to a more accessible digital world begins here
//               </p>
//               <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
//                 <div className="rounded-md shadow">
//                   <a
//                     href="#"
//                     className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 md:py-4 md:text-lg md:px-10"
//                   >
//                     Visit Now
//                   </a>
//                 </div>
//                 <div className="mt-3 sm:mt-0 sm:ml-3">
//                   <a
//                     href="#"
//                     className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
//                   >
//                     Discussions 
//                     <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center">
//         <div className="w-full h-full flex items-center justify-center lg:max-w-md xl:max-w-lg">
//           <img
//             className="object-contain w-full h-auto max-h-[80vh]"
//             src="hero.svg"
//             alt="Augmented Reality Visualization"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function UserHero() {
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`relative overflow-hidden ${
      isDarkTheme 
        ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
        : 'bg-gradient-to-r from-black to-white-600'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to</span>{' '}
                <span className={`block xl:inline ${
                  isDarkTheme ? 'text-blue-400' : 'text-yellow-400'
                }`}>AR HUB</span>
              </h1>
              <p className={`mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-300'
              }`}>
                Discover inclusive design solutions, collaborate with accessibility experts, 
                and stay informed about the latest in adaptive techs. Your gateway to a more 
                accessible digital world begins here
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => navigate('/dat')}
                    className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white 
                    ${isDarkTheme 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-yellow-500 hover:bg-yellow-600'
                    } 
                    transition duration-300 md:py-4 md:text-lg md:px-10`}
                  >
                    Explore Tech's
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => navigate('/discussion')}
                    className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md
                    ${isDarkTheme 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                    }
                    transition duration-300 md:py-4 md:text-lg md:px-10`}
                  >
                    Discussions
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className={`w-full h-full flex items-center justify-center lg:max-w-md xl:max-w-lg 
          ${isDarkTheme ? 'opacity-90' : 'opacity-100'}`}>
          <img
            className="object-contain w-full h-auto max-h-[80vh]"
            src="hero.svg"
            alt="Augmented Reality Visualization"
          />
        </div>
      </div>

      {/* Optional: Add a subtle gradient overlay for dark mode */}
      {isDarkTheme && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/0 pointer-events-none" />
      )}
    </div>
  );
}