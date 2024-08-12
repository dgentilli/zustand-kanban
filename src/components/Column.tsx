import './Column.css';
import { useDraggedTask, useTasksActions, useTasksByState } from '../store';
import Task from './Task';
import { useState } from 'react';

const Column = ({ state }: { state: 'PLANNED' | 'ONGOING' | 'DONE' }) => {
  const tasks = useTasksByState(state);
  const draggedTask = useDraggedTask();
  const { addTask, dragTask, dropTask } = useTasksActions();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTask(newTaskTitle, state);
    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  return (
    <div
      className='column'
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        console.log('drop', e);
        dropTask(draggedTask as string, state);
        // Then set the dragged task back to undefined
        dragTask(undefined);
      }}
    >
      <div className='titleWrapper'>
        <button className='button' onClick={() => setIsModalOpen(true)}>
          Add
        </button>
        <p>{state}</p>
      </div>

      {tasks.map((task) => (
        <Task title={task.title} status={task.state} key={task.title} />
      ))}
      {isModalOpen ? (
        <div className='modal'>
          <div className='modalContent'>
            <button
              className='closeButton'
              onClick={() => setIsModalOpen(false)}
            >
              X - Close
            </button>
            <div>Add a new task to {state}</div>
            <input
              onChange={(event) => setNewTaskTitle(event.target.value)}
              value={newTaskTitle}
            />
            <button className='addButton' onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Column;
