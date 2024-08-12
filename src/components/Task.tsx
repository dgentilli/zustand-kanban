import classNames from 'classnames';
import './Task.css';
import { useTasksActions } from '../store';

interface Props {
  title: string;
  status: 'PLANNED' | 'ONGOING' | 'DONE';
}

const Task = ({ title, status }: Props) => {
  const { deleteTask, dragTask } = useTasksActions();

  return (
    <div className='task' draggable onDragStart={() => dragTask(title)}>
      <div>{title}</div>
      <div className='bottomWrapper'>
        <button className='deleteButton' onClick={() => deleteTask(title)}>
          Delete
        </button>
        <div className={classNames('status', status)}>{status}</div>
      </div>
    </div>
  );
};

export default Task;
