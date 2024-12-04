import React, { useState } from 'react';
import { useTrainingStore } from '../../store/trainingStore';
import { UserGroup } from '../../types';
import { Users, Plus, Trash } from 'lucide-react';

export function UserManagement() {
  const { groups, addGroup, updateGroup } = useTrainingStore();
  const [newGroup, setNewGroup] = useState<Partial<UserGroup>>({});
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroup.name) {
      addGroup({
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description || '',
        members: [],
      });
      setNewGroup({});
      setShowNewGroupForm(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">User Groups</h2>
        <button
          onClick={() => setShowNewGroupForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Group
        </button>
      </div>

      {showNewGroupForm && (
        <form onSubmit={handleCreateGroup} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Group Name</label>
              <input
                type="text"
                value={newGroup.name || ''}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newGroup.description || ''}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewGroupForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Create Group
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <Trash className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-500 mb-4">{group.description}</p>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Members ({group.members.length})</h4>
              {/* Member list would go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}