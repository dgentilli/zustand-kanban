import { beforeEach, describe, expect, it } from 'vitest';
import {
  useDraggedTask,
  useTasks,
  useTasksActions,
  useTasksByState,
  useTaskStore,
} from './store'; // Adjust the import path as needed

describe('Task Store', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [], draggedTask: undefined });
  });

  it('should add a task', () => {
    const { addTask } = useTasksActions();
    addTask('New Task', 'PLANNED');
    const tasks = useTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual({ title: 'New Task', state: 'PLANNED' });
  });

  it('should delete a task', () => {
    const { addTask, deleteTask } = useTasksActions();
    addTask('Task to Delete', 'ONGOING');
    deleteTask('Task to Delete');
    const tasks = useTasks();
    expect(tasks).toHaveLength(0);
  });

  it('should set dragged task', () => {
    const { dragTask } = useTasksActions();
    dragTask('Dragged Task');
    const draggedTask = useDraggedTask();
    expect(draggedTask).toBe('Dragged Task');
  });

  it('should drop a task', () => {
    const { addTask, dropTask } = useTasksActions();
    addTask('Task to Drop', 'PLANNED');
    dropTask('Task to Drop', 'DONE');
    const tasks = useTasks();
    expect(tasks[0]).toEqual({ title: 'Task to Drop', state: 'DONE' });
  });

  it('should filter tasks by state', () => {
    const { addTask } = useTasksActions();
    addTask('Task 1', 'PLANNED');
    addTask('Task 2', 'ONGOING');
    addTask('Task 3', 'DONE');

    const plannedTasks = useTasksByState('PLANNED');
    const ongoingTasks = useTasksByState('ONGOING');
    const doneTasks = useTasksByState('DONE');

    expect(plannedTasks).toHaveLength(1);
    expect(ongoingTasks).toHaveLength(1);
    expect(doneTasks).toHaveLength(1);
  });
});
