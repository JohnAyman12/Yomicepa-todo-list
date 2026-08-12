import { type listItm } from '../../Types/types';
import ListElem from '../Templates/ListElem';

interface DateGroupProps {
    date: string;
    tasks: listItm[];
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, updatedData: Partial<Omit<listItm, 'id'>>) => void;
}

export default function DateGroup({
    date,
    tasks,
    onToggleComplete,
    onDelete,
    onEdit,
}: DateGroupProps) {
    const formatDateHeader = (dateString: string) => {
        if (!dateString) return 'No Date';
        const [year, month, day] = dateString.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);

        return dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="date-group">
            <h3 className="date-group-header">📅 {formatDateHeader(date)}</h3>
            <div className="task-list">
                {tasks.map((task) => (
                    <ListElem
                        key={task.id}
                        {...task}
                        onToggleComplete={onToggleComplete}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
}