export type TaskType = {
  title: string;
  state: 'PLANNED' | 'ONGOING' | 'DONE';
};

export interface TaskState {
  tasks: TaskType[];
}

import { create } from 'zustand';

export const useTaskStore = create<TaskState>(() => ({
  tasks: [
    {
      title: 'Test123',
      state: 'PLANNED',
    },
    {
      title: 'Test456',
      state: 'ONGOING',
    },
    {
      title: 'Test789',
      state: 'DONE',
    },
  ],
}));
