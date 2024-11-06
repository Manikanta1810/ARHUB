import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MoreButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center p-8">
      <button
        onClick={() => navigate('/resources')}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-blue-500 px-8 py-4 text-white transition-all duration-300 hover:bg-blue-600 hover:pl-10 hover:pr-6"
      >
        <span className="font-semibold">More Resources</span>
        <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
      </button>
    </div>
  );
};

export default MoreButton;