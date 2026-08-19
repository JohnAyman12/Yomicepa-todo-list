import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type listItm } from '../../Types/types';
import { useTasks } from '../../Context/TaskContext/UseTasks';
import DeleteModal from '../Molecules/DeleteModal';
import '../../styles/ListElemView.css';

interface ListElemViewProps {
    task: listItm;
    onEditClick: () => void;
    onDeleteSuccess?: () => void;
}

export default function ListElemView({ task, onEditClick, onDeleteSuccess }: ListElemViewProps) {
    const navigate = useNavigate();
    const { toggleTaskComplete, deleteTask } = useTasks();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input')) {
            return;
        }
        navigate(`/task/${task.id}`);
    };

    const handleConfirmDelete = () => {
        setShowDeleteModal(false);
        deleteTask(task.id);
        onDeleteSuccess?.();
    };

    return (
        <>
            <div className="task-card-content" onClick={handleCardClick}>
                <div className="task-card-left">
                    <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={task.isChecked}
                        onChange={() => toggleTaskComplete(task.id)}
                    />
                    <div className="task-details">
                        <h3 className="task-title">{task.name}</h3>
                        {task.description && <p className="task-description">{task.description}</p>}
                        <div className="task-metadata">
                            <span className="task-date">📅 {task.date}</span>
                            <span className="task-time">⏰ {task.time}</span>
                            <span className={`priority-badge ${task.priority}`}>
                                {task.priority.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="task-card-actions">
                    <button type="button" className="btn-action edit-btn" onClick={onEditClick} title="Edit Task">
                        ✏️
                    </button>
                    <button
                        type="button"
                        className="btn-action delete-btn"
                        onClick={() => setShowDeleteModal(true)}
                        title="Delete Task"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <DeleteModal
                isOpen={showDeleteModal}
                taskTitle={task.name}
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </>
    );
}