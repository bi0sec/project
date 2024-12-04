import React from 'react';
import { Plus, Users, BookOpen } from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { UserManagement } from './UserManagement';
import { TrainingManagement } from './TrainingManagement';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState<'users' | 'trainings'>('users');
  const { trainings, groups } = useTrainingStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={() => setActiveTab(activeTab === 'users' ? 'trainings' : 'users')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === 'users' ? 'New Training' : 'New User Group'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
            >
              <Users className="h-5 w-5 mx-auto mb-1" />
              Users & Groups
            </button>
            <button
              onClick={() => setActiveTab('trainings')}
              className={`${
                activeTab === 'trainings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
            >
              <BookOpen className="h-5 w-5 mx-auto mb-1" />
              Trainings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' ? <UserManagement /> : <TrainingManagement />}
        </div>
      </div>
    </div>
  );
}