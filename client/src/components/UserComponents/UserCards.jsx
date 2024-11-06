// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Card = ({ title, buttonText, bgColor, children, onClick }) => (
//   <div className={`${bgColor} p-6 rounded-lg flex flex-row h-64`}>
//     <div className='mt-10'>
//       <h3 className="text-lg font-medium mb-10 flex-grow">{title}</h3>
//       <button 
//         className="bg-red-500 text-white px-10 py-2 rounded text-sm font-medium self-start"
//         onClick={onClick}
//       >
//         {buttonText}
//       </button>
//     </div>
//     <div className="mb-4 flex-grow flex items-end">{children}</div>
//   </div>
// );

// export default function UserCards() {
//   const navigate = useNavigate();

//   const handleFeedbackClick = () => {
//     navigate('/feedback');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card 
//           title="Get real-time news coverage from around the world, updated continuously" 
//           buttonText="News" 
//           bgColor="bg-pink-100"
//         />
        
//         <Card 
//           title="Engage in meaningful conversations with diverse perspectives on every topic" 
//           buttonText="Discussions" 
//           bgColor="bg-orange-100"
//         />
        
//         <Card 
//           title="We value your opinions! Share your feedback to help us improve and enhance your experience." 
//           buttonText="Feedback" 
//           bgColor="bg-yellow-100"
//           onClick={handleFeedbackClick}
//         />
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Card = ({ title, buttonText, bgColor, darkBgColor, children, onClick }) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={`${isDarkTheme ? darkBgColor : bgColor} p-6 rounded-lg flex flex-row h-64 transition-colors duration-300`}>
      <div className='mt-10'>
        <h3 className={`text-lg font-medium mb-10 flex-grow ${
          isDarkTheme ? 'text-gray-100' : 'text-gray-800'
        }`}>
          {title}
        </h3>
        <button 
          className={`${
            isDarkTheme 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-red-500 hover:bg-red-600'
          } text-white px-10 py-2 rounded text-sm font-medium self-start transition-colors duration-300`}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
      <div className="mb-4 flex-grow flex items-end">{children}</div>
    </div>
  );
};

export default function UserCards() {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  const handleNewsClick = () => {
    navigate('/news');
  };

  const handleDiscussionsClick = () => {
    navigate('/discussion');
  };

  const handleFeedbackClick = () => {
    navigate('/feedback');
  };

  return (
    <div className={`${
      isDarkTheme ? 'bg-gray-900' : 'bg-white'
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            title="Get real-time news coverage from around the world, updated continuously" 
            buttonText="News" 
            bgColor="bg-pink-100"
            darkBgColor="bg-gray-800"
            onClick={handleNewsClick}
          />
          
          <Card 
            title="Engage in meaningful conversations with diverse perspectives on every topic" 
            buttonText="Discussions" 
            bgColor="bg-orange-100"
            darkBgColor="bg-gray-800"
            onClick={handleDiscussionsClick}
          />
          
          <Card 
            title="We value your opinions! Share your feedback to help us improve and enhance your experience." 
            buttonText="Feedback" 
            bgColor="bg-yellow-100"
            darkBgColor="bg-gray-800"
            onClick={handleFeedbackClick}
          />
        </div>
      </div>
    </div>
  );
}