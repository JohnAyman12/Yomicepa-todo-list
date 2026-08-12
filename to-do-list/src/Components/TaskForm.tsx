import { useState } from 'react';
import { priorityState } from '../Types/types'
import '../styles/TaskForm.css';

export default function TaskForm() {
  const [priority, setPriority] = useState<priorityState>(priorityState.MEDIUM);
  return (
    <form className="task-form-inline" data-priority={priority}>
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
          data-priority={priority} // Useful for dynamic CSS targeting
        >
          {Object.values(priorityState).map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="add-btn">Add Task</button>
    </form>
  );
}