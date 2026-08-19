import { useState, type SyntheticEvent } from 'react';
import { type listItm, type priorityState } from '../../Types/types';
import { useTasks } from '../../Context/TaskContext/UseTasks';
import { parseTaskFormData } from '../../utils/parseTaskFormData';
import TaskFields from '../Molecules/TaskFields';
import '../../styles/ListElemEdit.css';

interface ListElemEditProps {
    task: listItm;
    onCancel: () => void;
}

export default function ListElemEdit({ task, onCancel }: ListElemEditProps) {
    const { editTask } = useTasks();
    const [priority, setPriority] = useState<priorityState>(task.priority);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const { parsed, error: validationError } = parseTaskFormData(formData, task.priority);

        if (validationError || !parsed) {
            setError(validationError ?? 'Invalid form input.');
            return;
        }

        editTask(task.id, parsed);

        onCancel();
    };

    return (
        <form className="inline-edit-form" data-priority={priority} onSubmit={handleSubmit}>
            {error && <p className="edit-error-message">{error}</p>}

            <TaskFields initialValues={task} onPriorityChange={setPriority} />

            <div className="inline-edit-actions">
                <button
                    type="submit"
                    className="btn-submit btn-small"
                    aria-label="Save task changes"
                >
                    💾 Save
                </button>
                <button
                    type="button"
                    className="btn-back btn-small"
                    onClick={onCancel}
                    aria-label="Cancel editing"
                >
                    ❌ Cancel
                </button>
            </div>
        </form>
    );
}