import './Column.css';
import Task from './Task';

const Column = ({ state }) => {
  return (
    <div className='column'>
      <p>{state}</p>
      <Task title='To Do' />
    </div>
  );
};

export default Column;
