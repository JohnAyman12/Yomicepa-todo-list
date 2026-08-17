import { useState } from 'react';
import { type listItm } from '../../Types/types';
import ListElemView from '../Organisms/ListElemView';
import ListElemEdit from '../Organisms/ListElemEdit';
import '../../styles/ListElem.css';

interface ListElemProps {
    task: listItm;
    onDeleteSuccess?: () => void;
}

export default function ListElem({ task,onDeleteSuccess }: ListElemProps) {
    const [isEditing, setIsEditing] = useState(false);

    if (!task) return null;

    return (
        <div
            className={`task-card ${task.isChecked ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
            data-priority={task.priority}
        >
            {isEditing ? (
                <ListElemEdit
                    task={task}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <ListElemView
                    task={task}
                    onEditClick={() => setIsEditing(true)}
                    onDeleteSuccess={onDeleteSuccess}
                />
            )}
        </div>
    );
}