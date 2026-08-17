import { type listItm } from '../../Types/types';
import ListElem from '../Templates/ListElem';
import '../../styles/DateGroup.css'

interface DateGroupProps {
    date: string;
    tasks: listItm[];
}

export default function DateGroup({
    date,
    tasks,
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
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
}