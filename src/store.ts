export type TaskState = 'PLANNED' | 'ONGOING' | 'DONE';

export type TaskType = {
  title: string;
  state: TaskState;
};

interface TasksState {
  tasks: TaskType[];
  draggedTask: undefined | string;
  actions: {
    addTask: (title: string, state: TaskState) => void;
    deleteTask: (title: string) => void;
    dragTask: (title: string | undefined) => void;
    dropTask: (title: string, state: TaskState) => void;
  };
}

import { create } from 'zustand';

const useTaskStore = create<TasksState>((set) => ({
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
  draggedTask: undefined,
  actions: {
    addTask: (title, state) =>
      set((store) => ({ tasks: [...store.tasks, { title, state }] })),
    deleteTask: (title) =>
      set((store) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      })),
    dragTask: (title) => set({ draggedTask: title }),
    dropTask: (title, state) =>
      set((store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      })),
  },
}));

export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTasksByState = (state: 'PLANNED' | 'ONGOING' | 'DONE') =>
  useTaskStore((store) => store.tasks.filter((task) => task.state === state));
export const useTasksActions = () => useTaskStore((state) => state.actions);
export const useDraggedTask = () => useTaskStore((state) => state.draggedTask);
