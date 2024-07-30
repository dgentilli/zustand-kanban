import classNames from 'classnames';
import './Task.css';

interface Props {
  title: string;
  status: 'PLANNED' | 'ONGOING' | 'DONE';
}

const Task = ({ title, status }: Props) => {
  return (
    <div className='task'>
      <div>{title}</div>
      <div className='bottomWrapper'>
        <div></div>
        <div className={classNames('status', status)}>{status}</div>
      </div>
    </div>
  );
};

export default Task;
