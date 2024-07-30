import './Column.css';
import { TaskState, useTaskStore } from '../store';
import Task from './Task';
import { useMemo } from 'react';

const tasksSelector = (state: TaskState) => state.tasks;

const Column = ({ state }: { state: 'PLANNED' | 'ONGOING' | 'DONE' }) => {
  const tasks = useTaskStore(tasksSelector);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.state === state);
  }, [tasks, state]);

  return (
    <div className='column'>
      <p>{state}</p>
      {filteredTasks.map((task) => (
        <Task title={task.title} status={task.state} key={task.title} />
      ))}
    </div>
  );
};

export default Column;
