import { useTrainingStore } from '../store/trainingStore';
import { useGroupStore } from '../store/groupStore';

export function initializeStores() {
  const { addTraining } = useTrainingStore.getState();
  const { addGroup } = useGroupStore.getState();

  // Add initial training
  addTraining({
    id: '1',
    title: 'Security Awareness Basics',
    description: 'Learn the fundamentals of security awareness',
    content: 'Initial content...',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Add initial group
  addGroup({
    id: '1',
    name: 'Default Group',
    description: 'Default user group',
    members: [],
    trainings: ['1'],
  });
} 