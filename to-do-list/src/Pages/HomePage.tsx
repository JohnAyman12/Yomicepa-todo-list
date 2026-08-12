import TaskForm from '../Components/TaskForm';
import { priorityState } from '../Types/types'

export default function HomePage() {
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault(); // Stop page refresh

        const form = e.currentTarget;
        const formData = new FormData(form);

        const newTask = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            date: formData.get('date') as string,
            time: formData.get('time') as string,
            priority: formData.get('priority') as priorityState,
        };

        console.log('New Task Data:', newTask);
    };
    return (
        <div className="task-page">
            <TaskForm onSubmit={handleSubmit} />
        </div>
    );
}