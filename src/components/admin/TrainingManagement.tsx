import React, { useState } from 'react';
import { useTrainingStore } from '../../store/trainingStore';
import { Training } from '../../types';
import { Plus, Edit, Trash } from 'lucide-react';

export function TrainingManagement() {
  const { trainings, addTraining } = useTrainingStore();
  const [newTraining, setNewTraining] = useState<Partial<Training>>({});
  const [showNewTrainingForm, setShowNewTrainingForm] = useState(false);

  const handleCreateTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTraining.title) {
      addTraining({
        id: Date.now().toString(),
        title: newTraining.title,
        description: newTraining.description || '',
        slides: [],
        assignedTo: {
          users: [],
          groups: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setNewTraining({});
      setShowNewTrainingForm(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Training Management</h2>
        <button
          onClick={() => setShowNewTrainingForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Training
        </button>
      </div>

      {showNewTrainingForm && (
        <form onSubmit={handleCreateTraining} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Training Title</label>
              <input
                type="text"
                value={newTraining.title || ''}
                onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newTraining.description || ''}
                onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewTrainingForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Create Training
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6">
        {trainings.map((training) => (
          <div key={training.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-500">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-500 mb-4">{training.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Created: {training.createdAt.toLocaleDateString()}</span>
              <span>{training.slides.length} slides</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}