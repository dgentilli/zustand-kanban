import classNames from 'classnames';
import './Task.css';
import { useTasksActions } from '../store';

interface Props {
  title: string;
  status: 'PLANNED' | 'ONGOING' | 'DONE';
}

const Task = ({ title, status }: Props) => {
  const { deleteTask } = useTasksActions();

  return (
    <div className='task'>
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
