/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Star, Home } from 'lucide-react';
import UserHeader from '../../components/UserComponents/UserHeader';

const FeedbackPage = () => {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('My feedback!!');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    console.log('Submitted:', { rating, feedback });
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
          className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <Home size={18} className="mr-2" /> Home
        </button>
      </form>
    </div>
    </div>
  );
};

export default FeedbackPage;