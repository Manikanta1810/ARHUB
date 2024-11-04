import React, { useState } from 'react';
import { Star, Home } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserHeader from '../../components/UserComponents/UserHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <div>
      <UserHeader />
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-center mb-2">Feedback</h2>
        <p className="text-center text-gray-600 mb-4">Please rate your experience below</p>

        <div className="flex justify-center items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              onClick={() => setRating(star)}
              fill={star <= rating ? '#FFD700' : '#E5E7EB'}
              stroke={star <= rating ? '#FFD700' : '#E5E7EB'}
              className="cursor-pointer mx-1"
            />
          ))}
          <span className="ml-2 text-gray-600">{rating}/5 stars</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-600 mb-2">
              Additional feedback
            </label>
            <textarea
              id="feedback"
              rows="4"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
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

          <div className="text-center my-2 text-gray-500">OR</div>

          <button
            type="button"
            onClick={handleHomeClick}
            className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <Home size={18} className="mr-2" /> Home
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default FeedbackPage;