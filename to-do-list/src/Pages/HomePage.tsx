import { useTasks } from '../Context/UseTasks';
import { type listItm } from '../Types/types';
import TaskForm from '../Components/TaskForm';
import ListElem from '../Components/ListElem';
import '../styles/Homepage.css';

export default function HomePage() {
    const { tasks, toggleTaskComplete, deleteTask, editTask } = useTasks();

    return (
        <div className="homepage-container">
            <h1 className="homepage-title">Task Manager</h1>

            <section className="form-section">
                <TaskForm />
            </section>

            <section className="task-list-section">
                <h2>Tasks ({tasks.length})</h2>

                {tasks.length === 0 ? (
                    <p className="empty-state">No tasks created yet. Add one above!</p>
                ) : (
                    <div className="task-list">
                        {tasks.map((task: listItm) => (
                            <ListElem
                                key={task.id}
                                {...task}
                                onToggleComplete={toggleTaskComplete}
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}