import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TrainingViewer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Introduction to Security Awareness",
      content: "Understanding the importance of cybersecurity in our organization",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Password Security",
      content: "Best practices for creating and managing secure passwords",
      image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=800&q=80"
    },
    // Add more slides as needed
  ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/quiz');
    } else {
      setCurrentSlide(current => current + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentSlide(current => Math.max(0, current - 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
        <p className="text-gray-600">{slides[currentSlide].content}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentSlide === 0}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
        <span className="text-sm text-gray-500">
          {currentSlide + 1} of {slides.length}
        </span>
        <button
          onClick={handleNext}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {currentSlide === slides.length - 1 ? 'Start Quiz' : 'Next'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
}