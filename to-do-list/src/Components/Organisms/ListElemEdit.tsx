import React, { useState } from 'react';
import { type listItm, type priorityState } from '../../Types/types';
import { useTasks } from '../../Context/TaskContext/UseTasks';
import TaskFields from '../Molecules/TaskFields';
import '../../styles/ListElemEdit.css';

const VALID_PRIORITIES: priorityState[] = ['high', 'medium', 'low'];

// Type Guard to validate form input against priorityState
const isValidPriority = (value: unknown): value is priorityState => {
    return typeof value === 'string' && VALID_PRIORITIES.includes(value as priorityState);
};

interface ListElemEditProps {
    task: listItm;
    onCancel: () => void;
}

export default function ListElemEdit({ task, onCancel }: ListElemEditProps) {
    const { editTask } = useTasks();
    const [priority, setPriority] = useState<priorityState>(task.priority);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        const name = String(formData.get('name') ?? '').trim();
        const description = String(formData.get('description') ?? '').trim();
        const date = String(formData.get('date') ?? '');
        const time = String(formData.get('time') ?? '');
        const rawPriority = formData.get('priority');

        if (!name) {
            setError('Task name cannot be empty.');
            return;
        }

        const validPriority: priorityState = isValidPriority(rawPriority)
            ? rawPriority
            : task.priority;

        editTask(task.id, {
            name,
            description,
            date,
            time,
            priority: validPriority,
        });

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