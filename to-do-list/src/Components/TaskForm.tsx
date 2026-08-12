import React, { useState } from 'react';
import { priorityState, ListActionType } from '../Types/types';
import { useTasks } from '../Context/UseTasks';
import HandleListBtn from './HandleListBtn';
import '../styles/TaskForm.css';

export default function TaskForm() {
  const [priority, setPriority] = useState<priorityState>(priorityState.MEDIUM);
  const { addTask } = useTasks(); // Access global add function

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const newTask = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      priority: formData.get('priority') as priorityState,
    };

    addTask(newTask)

    console.log('New Task Data:', newTask);
  };

  return (
    <form className="task-form-inline" data-priority={priority} onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="name">Task Name</label>
        <input type="text" id="name" name="name" placeholder="Task name..." required />
      </div>

      <div className="input-group">
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" placeholder="Details..." />
      </div>

      <div className="input-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" required />
      </div>

      <div className="input-group">
        <label htmlFor="time">Time</label>
        <input type="time" id="time" name="time" required />
      </div>

      <div className="input-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as priorityState)}
        >
          {Object.values(priorityState).map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <HandleListBtn actionType={ListActionType.ADD} type="submit" />
    </form>
  );
}