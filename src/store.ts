type TaskType = {
  title: string;
  state: 'PLANNED' | 'ONGOING' | 'DONE';
};

interface TaskState {
  tasks: TaskType[];
}

import { create } from 'zustand';

const useTaskStore = create<TaskState>(() => ({
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

export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTasksByState = (state: 'PLANNED' | 'ONGOING' | 'DONE') =>
  useTaskStore((store) => store.tasks.filter((task) => task.state === state));
