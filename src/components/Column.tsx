import './Column.css';
import { useTasksByState } from '../store';
import Task from './Task';

const Column = ({ state }: { state: 'PLANNED' | 'ONGOING' | 'DONE' }) => {
  const tasks = useTasksByState(state);

  return (
    <div className='column'>
      <p>{state}</p>
      {tasks.map((task) => (
        <Task title={task.title} status={task.state} key={task.title} />
      ))}
    </div>
  );
};

export default Column;
