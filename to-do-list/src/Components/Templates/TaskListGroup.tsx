import { type listItm, priorityState } from '../../Types/types';
import DateGroup from '../Organisms/DateGroup';

interface TaskListGroupProps {
    tasks: listItm[];
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, updatedData: Partial<Omit<listItm, 'id'>>) => void;
}

export default function TaskListGroup({
    tasks,
    onToggleComplete,
    onDelete,
    onEdit,
}: TaskListGroupProps) {
    if (tasks.length === 0) {
        return <p className="empty-state">No tasks created yet. Add one above!</p>;
    }

    // Priority weight mapping (High > Medium > Low)
    const priorityRank: Record<priorityState, number> = {
        [priorityState.HIGH]: 3,
        [priorityState.MEDIUM]: 2,
        [priorityState.LOW]: 1,
    };

    // Group and sort tasks
    const groupTasksByDate = (taskList: listItm[]) => {
        const sortedTasks = [...taskList].sort((a, b) => {
            // 1. Primary Sort: Date & Time (Ascending)
            const dateTimeA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
            const dateTimeB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();

            if (dateTimeA !== dateTimeB) {
                return dateTimeA - dateTimeB;
            }

            // 2. Secondary Sort: Priority (High -> Medium -> Low)
            return priorityRank[b.priority] - priorityRank[a.priority];
        });

        const grouped: Record<string, listItm[]> = {};

        sortedTasks.forEach((task) => {
            const dateKey = task.date;
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(task);
        });

        return grouped;
    };

    const groupedTasks = groupTasksByDate(tasks);

    return (
        <div className="task-groups">
            {Object.entries(groupedTasks).map(([date, items]) => (
                <DateGroup
                    key={date}
                    date={date}
                    tasks={items}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}