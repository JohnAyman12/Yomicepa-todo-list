import React, { useState } from 'react';
import { priorityState } from '../Types/types';
import { useTasks } from '../Context/UseTasks';
import TaskFields from './TaskFields';
import '../styles/TaskForm.css';

export default function TaskForm() {
  const [priority, setPriority] = useState<priorityState>(priorityState.MEDIUM);
  const { addTask } = useTasks();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    addTask({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      priority: formData.get('priority') as priorityState,
    });

    form.reset();
    setPriority(priorityState.MEDIUM);
  };

  return (
    <form className="task-form-inline" data-priority={priority} onSubmit={handleSubmit}>
      <TaskFields onPriorityChange={setPriority} />
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          ➕ Add Task
        </button>
      </div>
    </form>
  );
}