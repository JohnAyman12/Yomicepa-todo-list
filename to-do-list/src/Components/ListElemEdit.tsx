import React, { useState } from 'react';
import { type listItm, priorityState } from '../Types/types';
import TaskFields from './TaskFields';
import '../styles/ListElemEdit.css';

interface ListElemEditProps {
    task: listItm;
    onSave: (updatedData: Partial<Omit<listItm, 'id'>>) => void;
    onCancel: () => void;
}

export default function ListElemEdit({ task, onSave, onCancel }: ListElemEditProps) {
    const [priority, setPriority] = useState<priorityState>(task.priority);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        onSave({
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            date: formData.get('date') as string,
            time: formData.get('time') as string,
            priority: formData.get('priority') as priorityState,
        });
    };

    return (
        <form className="inline-edit-form" data-priority={priority} onSubmit={handleSubmit}>
            <TaskFields initialValues={task} onPriorityChange={setPriority} />

            <div className="inline-edit-actions">
                <button type="submit" className="handle-list-btn btn-add btn-small">
                    💾 Save
                </button>
                <button
                    type="button"
                    className="handle-list-btn btn-clear btn-small"
                    onClick={onCancel}
                >
                    ❌ Cancel
                </button>
            </div>
        </form>
    );
}