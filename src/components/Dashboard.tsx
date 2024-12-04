import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTrainingStore } from '../store/trainingStore';
import { useLocalAuthStore } from '../store/localAuthStore';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { trainings, progress } = useTrainingStore();
  const localLogout = useLocalAuthStore((state) => state.logout);

  const userProgress = progress.filter((p) => p.userId === user?.id);
  const completedTrainings = userProgress.filter((p) => p.completed);

  const handleLogout = () => {
    localLogout();
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Track your training progress and certificates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Available Trainings</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{trainings.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold">Completed Trainings</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{completedTrainings.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Your Groups</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{user?.groups.length || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Your Training Progress</h2>
        </div>
        <div className="divide-y">
          {trainings.map((training) => {
            const progress = userProgress.find((p) => p.trainingId === training.id);
            return (
              <div key={training.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{training.title}</h3>
                  <p className="text-sm text-gray-500">{training.description}</p>
                </div>
                <div className="flex items-center">
                  {progress?.completed ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => navigate(`/training/${training.id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}