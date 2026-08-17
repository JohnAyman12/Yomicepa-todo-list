import { useTasks } from '../Context/TaskContext/UseTasks';
import ThemeToggle from '../Components/Atoms/ThemeToggle';
import TaskForm from '../Components/Templates/TaskForm';
import TaskListGroup from '../Components/Templates/TaskListGroup';
import '../styles/HomePage.css';

export default function HomePage() {
    const { tasks } = useTasks();

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1 className="homepage-title">Task Manager</h1>
                <ThemeToggle />
            </header>

            <section className="form-section">
                <TaskForm />
            </section>

            <section className="task-list-section">
                <div className="task-list-header">
                    <h2>Tasks</h2>
                    <span className="task-count-badge">{tasks.length}</span>
                </div>

                <TaskListGroup
                    tasks={tasks}
                />
            </section>
        </div>
    );
}