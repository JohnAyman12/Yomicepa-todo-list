import React, { useState, useId } from 'react';
import { type listItm, type priorityState, PRIORITY_OPTIONS } from '../../Types/types';

interface TaskFieldsProps {
    initialValues?: Partial<listItm>;
    onPriorityChange?: (priority: priorityState) => void;
}

export default function TaskFields({ initialValues, onPriorityChange }: TaskFieldsProps) {
    const baseId = useId();

    const nameId = `${baseId}-name`;
    const descId = `${baseId}-description`;
    const dateId = `${baseId}-date`;
    const timeId = `${baseId}-time`;
    const priorityId = `${baseId}-priority`;

    const [priority, setPriority] = useState<priorityState>(
        initialValues?.priority || "medium"
    );

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as priorityState;
        setPriority(selected);
        onPriorityChange?.(selected);
    };

    return (
        <div className="task-fields-grid">
            <div className="input-group">
                <label htmlFor={nameId}>Task Name</label>
                <input
                    type="text"
                    id={nameId}
                    name="name"
                    defaultValue={initialValues?.name || ''}
                    placeholder="Task name..."
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor={descId}>Description</label>
                <input
                    type="text"
                    id={descId}
                    name="description"
                    defaultValue={initialValues?.description || ''}
                    placeholder="Details..."
                />
            </div>

            <div className="input-group">
                <label htmlFor={dateId}>Date</label>
                <input
                    type="date"
                    id={dateId}
                    name="date"
                    defaultValue={initialValues?.date || ''}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor={timeId}>Time</label>
                <input
                    type="time"
                    id={timeId}
                    name="time"
                    defaultValue={initialValues?.time || ''}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor={priorityId}>Priority</label>
                <select
                    id={priorityId}
                    name="priority"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    {PRIORITY_OPTIONS.map((level) => (
                        <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}