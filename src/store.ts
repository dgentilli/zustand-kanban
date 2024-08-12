import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

export const useTaskStore = create<TasksState>()(
  persist(
    devtools(
      (set) => ({
        tasks: [],
        draggedTask: undefined,
        actions: {
          addTask: (title, state) =>
            set(
              (store) => ({ tasks: [...store.tasks, { title, state }] }),
              false,
              'addTask'
            ),
          deleteTask: (title) =>
            set(
              (store) => ({
                tasks: store.tasks.filter((task) => task.title !== title),
              }),
              false,
              'deleteTask'
            ),
          dragTask: (title) => set({ draggedTask: title }, false, 'dragTask'),
          dropTask: (title, state) =>
            set(
              (store) => ({
                tasks: store.tasks.map((task) =>
                  task.title === title ? { title, state } : task
                ),
              }),
              false,
              'dropTask'
            ),
        },
      }),
      { name: 'Task Store' }
    ),
    {
      name: 'kanban',
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);

export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTasksByState = (state: 'PLANNED' | 'ONGOING' | 'DONE') =>
  useTaskStore((store) => store.tasks.filter((task) => task.state === state));
export const useTasksActions = () => useTaskStore((state) => state.actions);
export const useDraggedTask = () => useTaskStore((state) => state.draggedTask);
