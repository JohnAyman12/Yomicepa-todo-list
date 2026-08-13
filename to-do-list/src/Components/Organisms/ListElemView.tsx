import { type listItm } from '../../Types/types';
import { useNavigate } from 'react-router-dom';
import '../../styles/ListElemView.css';

interface ListElemViewProps {
    task: listItm;
    onToggleComplete?: (id: string) => void;
    onEditClick: () => void;
    onDelete?: (id: string) => void;
}

export default function ListElemView({
    task,
    onToggleComplete,
    onEditClick,
    onDelete,
}: ListElemViewProps) {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input')) {
            return;
        }

        navigate(`/task/${task.id}`);
    };

    return (
        <div className="task-card-content" onClick={handleCardClick}>
            <div className="task-card-left">
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.isChecked}
                    onChange={() => onToggleComplete?.(task.id)}
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
                <button type="button" className="btn-action edit-btn" onClick={onEditClick} title="Edit Task">✏️</button>
                <button type="button" className="btn-action delete-btn" onClick={() => onDelete?.(task.id)} title="Delete Task">🗑️</button>
            </div>
        </div>
    );
}