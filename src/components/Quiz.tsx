import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types';

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();

  const questions: Question[] = [
    {
      id: '1',
      text: 'What is the minimum recommended password length for a secure account?',
      options: ['6 characters', '8 characters', '12 characters', '16 characters'],
      correctAnswer: 2
    },
    {
      id: '2',
      text: 'Which of the following is a sign of a potential phishing email?',
      options: [
        'Comes from a known colleague',
        'Contains urgent action requirements',
        'Has company logo',
        'Uses proper grammar'
      ],
      correctAnswer: 1
    },
    // Add more questions
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(current => current + 1);
    } else {
      const score = calculateScore(newAnswers);
      if (score >= 0.7) {
        navigate('/certificate');
      } else {
        // Handle failed quiz
        alert('Please review the material and try again.');
        navigate('/training');
      }
    }
  };

  const calculateScore = (userAnswers: number[]) => {
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    return correctAnswers / questions.length;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Security Awareness Quiz</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl mb-4">{questions[currentQuestion].text}</h3>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </div>
  );
}