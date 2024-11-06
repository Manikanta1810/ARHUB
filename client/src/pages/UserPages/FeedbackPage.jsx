import React, { useState } from 'react';
import { Star, Home } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserHeader from '../../components/UserComponents/UserHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useTheme } from '../../contexts/ThemeContext';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating > 0) {
      try {
        const feedbackRef = collection(firestore, 'feedback_data');
        await addDoc(feedbackRef, {
          email: user.email,
          rating,
          feedback,
          timestamp: new Date()
        });

        toast.success('Feedback submitted successfully!');
        setRating(0);
        setFeedback('');
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error('An error occurred while submitting feedback.');
      }
    } else {
      toast.error('Please provide a rating before submitting.');
    }
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <div className={isDarkTheme ? 'bg-gray-900 min-h-screen' : 'bg-white min-h-screen'}>
      <UserHeader />
      <div className={`${
        isDarkTheme ? 'bg-gray-800' : 'bg-white'
      } rounded-3xl shadow-lg p-8 max-w-md mx-auto mt-16`}>
        <h2 className={`text-2xl font-semibold text-center mb-2 ${
          isDarkTheme ? 'text-white' : 'text-gray-800'
        }`}>
          Feedback
        </h2>
        <p className={`text-center mb-4 ${
          isDarkTheme ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Please rate your experience below
        </p>

        <div className="flex justify-center items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              onClick={() => setRating(star)}
              fill={star <= rating ? '#FFD700' : isDarkTheme ? '#4B5563' : '#E5E7EB'}
              stroke={star <= rating ? '#FFD700' : isDarkTheme ? '#4B5563' : '#E5E7EB'}
              className="cursor-pointer mx-1"
            />
          ))}
          <span className={`ml-2 ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {rating}/5 stars
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className={`block text-sm font-medium mb-2 ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Additional feedback
            </label>
            <textarea
              id="feedback"
              rows="4"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500 ${
                isDarkTheme 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Submit feedback
          </button>

          <div className={`text-center my-2 ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-500'
          }`}>
            OR
          </div>

          <button
            type="button"
            onClick={handleHomeClick}
            className={`w-full border py-2 rounded-lg transition-colors flex items-center justify-center ${
              isDarkTheme 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home size={18} className="mr-2" /> Home
          </button>
        </form>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        theme={isDarkTheme ? 'dark' : 'light'}
      />
    </div>
  );
};

export default FeedbackPage;