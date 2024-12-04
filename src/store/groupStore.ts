import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Group } from '../types';

interface GroupState {
  groups: Group[];
  addGroup: (group: Group) => void;
  addMemberToGroup: (groupId: string, userId: string) => void;
  removeMemberFromGroup: (groupId: string, userId: string) => void;
}

export const useGroupStore = create<GroupState>()(
  persist(
    (set) => ({
      groups: [],
      addGroup: (group) =>
        set((state) => ({
          groups: [...state.groups, group],
        })),
      addMemberToGroup: (groupId, userId) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? { ...group, members: [...group.members, userId] }
              : group
          ),
        })),
      removeMemberFromGroup: (groupId, userId) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? { ...group, members: group.members.filter((id) => id !== userId) }
              : group
          ),
        })),
    }),
    {
      name: 'group-storage',
    }
  )
); 