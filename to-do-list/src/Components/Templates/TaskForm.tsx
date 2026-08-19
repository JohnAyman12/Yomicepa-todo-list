import { useState, type SyntheticEvent } from 'react';
import { type priorityState } from '../../Types/types';
import { useTasks } from '../../Context/TaskContext/UseTasks';
import { parseTaskFormData } from '../../utils/parseTaskFormData';
import TaskFields from '../Molecules/TaskFields';
import '../../styles/TaskForm.css';

export default function TaskForm() {
  const [priority, setPriority] = useState<priorityState>("medium");
  const { addTask } = useTasks();
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const { parsed, error: validationError } = parseTaskFormData(formData, 'medium');

    if (validationError || !parsed) {
      setError(validationError ?? 'Invalid form input.');
      return;
    }

    addTask(parsed);

    form.reset();
    setPriority("medium");
  };

  return (
    <form className="task-form-inline" data-priority={priority} onSubmit={handleSubmit}>
      {error && <p className="edit-error-message">{error}</p>}

      <TaskFields onPriorityChange={setPriority} />

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          ➕ Add Task
        </button>
      </div>
    </form>
  );
}