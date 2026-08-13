import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../Context/TaskContext/UseTasks';
import ListElem from '../Components/Templates/ListElem';
import ThemeToggle from '../Components/Atoms/ThemeToggle';
import '../styles/TaskPage.css';

export default function TaskPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { tasks, toggleTaskComplete, deleteTask, editTask } = useTasks();

    const task = tasks.find((t) => t.id === id);

    return (
        <div className="task-page-container">
            <header className="task-page-header">
                <button type="button" className="btn-back" onClick={() => navigate('/')}>
                    ← Back to Tasks
                </button>
                <ThemeToggle />
            </header>

            {!task ? (
                <div className="empty-state">
                    <h2>Task Not Found</h2>
                    <p>This task doesn't exist or was recently deleted.</p>
                </div>
            ) : (
                <main className="task-page-content">
                    <ListElem
                        {...task}
                        onToggleComplete={toggleTaskComplete}
                        onDelete={(taskId) => {
                            deleteTask(taskId);
                            navigate('/');
                        }}
                        onEdit={editTask}
                    />
                </main>
            )}
        </div>
    );
}