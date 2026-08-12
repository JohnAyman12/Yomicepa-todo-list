import React, { useState } from 'react';
import { type listItm, priorityState } from '../../Types/types';

interface TaskFieldsProps {
    initialValues?: Partial<listItm>;
    onPriorityChange?: (priority: priorityState) => void;
}

export default function TaskFields({ initialValues, onPriorityChange }: TaskFieldsProps) {
    const [priority, setPriority] = useState<priorityState>(
        initialValues?.priority || priorityState.MEDIUM
    );

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as priorityState;
        setPriority(selected);
        onPriorityChange?.(selected);
    };

    return (
        <div className="task-fields-grid">
            <div className="input-group">
                <label htmlFor="name">Task Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={initialValues?.name || ''}
                    placeholder="Task name..."
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    defaultValue={initialValues?.description || ''}
                    placeholder="Details..."
                />
            </div>

            <div className="input-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    defaultValue={initialValues?.date || ''}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="time">Time</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    defaultValue={initialValues?.time || ''}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    {Object.values(priorityState).map((level) => (
                        <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}