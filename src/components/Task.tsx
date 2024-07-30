import classNames from 'classnames';
import './Task.css';

interface Props {
  title: string;
}

const STATUS = 'DONE';

const Task = ({ title }: Props) => {
  return (
    <div className='task'>
      <div>{title}</div>
      <div className='bottomWrapper'>
        <div></div>
        <div className={classNames('status', STATUS)}>{STATUS}</div>
      </div>
    </div>
  );
};

export default Task;
