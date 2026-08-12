import { useState } from 'react';
import { type listItm } from '../../Types/types';
import ListElemView from '../Organisms/ListElemView';
import ListElemEdit from '../Organisms/ListElemEdit';
import '../../styles/ListElem.css';

interface ListElemProps extends listItm {
    onToggleComplete: (id: string) => void;
    onEdit: (id: string, updatedData: Partial<Omit<listItm, 'id'>>) => void; // partial makes all properties of interface optional
    onDelete: (id: string) => void;
}

export default function ListElem(props: ListElemProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (updatedData: Partial<Omit<listItm, 'id'>>) => {
        props.onEdit(props.id, updatedData);
        setIsEditing(false);
    };

    return (
        <div
            className={`task-card ${props.isChecked ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
            data-priority={props.priority}
        >
            {isEditing ? (
                <ListElemEdit
                    task={props}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <ListElemView
                    task={props}
                    onToggleComplete={props.onToggleComplete}
                    onEditClick={() => setIsEditing(true)}
                    onDelete={props.onDelete}
                />
            )}
        </div>
    );
}