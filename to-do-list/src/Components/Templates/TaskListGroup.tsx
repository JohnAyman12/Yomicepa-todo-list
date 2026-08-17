import { useState, useMemo } from 'react';
import { type listItm, type priorityState, type SortOption } from '../../Types/types';
import DateGroup from '../Organisms/DateGroup';
import ListElem from './ListElem';
import SortPanel from './SortPanel';
import '../../styles/TaskListGroup.css';

interface TaskListGroupProps {
    tasks: listItm[];
}

const PRIORITY_RANK: Record<priorityState, number> = {
    high: 3,
    medium: 2,
    low: 1,
};

const parseTaskDateTime = (dateStr: string, timeStr?: string): number => {
    if (!dateStr) return Infinity;
    const parsed = new Date(`${dateStr}T${timeStr || '00:00'}`).getTime();
    return Number.isNaN(parsed) ? Infinity : parsed;
};

const getSortedTasks = (tasks: listItm[], sortOption: SortOption): listItm[] => {
    const listCopy = [...tasks];

    switch (sortOption) {
        case 'DEFAULT':
            return listCopy;

        case 'ALPHABETICAL':
            return listCopy.sort((a, b) => a.name.localeCompare(b.name));

        case 'PRIORITY':
            return listCopy.sort(
                (a, b) => (PRIORITY_RANK[b.priority] ?? 0) - (PRIORITY_RANK[a.priority] ?? 0)
            );

        case 'DATE':
            return listCopy.sort((a, b) => {
                const dateTimeA = parseTaskDateTime(a.date, a.time);
                const dateTimeB = parseTaskDateTime(b.date, b.time);
                return dateTimeA - dateTimeB;
            });

        default: {
            const _exhaustiveCheck: never = sortOption;
            console.error(`Unhandled sort option: ${JSON.stringify(_exhaustiveCheck)}`);
            return listCopy;
        }
    }
};

const groupTasksByDate = (taskList: listItm[]): Record<string, listItm[]> => {
    const sortedTasks = [...taskList].sort((a, b) => {
        const dateTimeA = parseTaskDateTime(a.date, a.time);
        const dateTimeB = parseTaskDateTime(b.date, b.time);

        if (dateTimeA !== dateTimeB) {
            return dateTimeA - dateTimeB;
        }
        return (PRIORITY_RANK[b.priority] ?? 0) - (PRIORITY_RANK[a.priority] ?? 0);
    });

    const grouped: Record<string, listItm[]> = {};
    sortedTasks.forEach((task) => {
        const dateKey = task.date || 'No Date';
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(task);
    });

    return grouped;
};

export default function TaskListGroup({ tasks }: TaskListGroupProps) {
    const [currentSort, setCurrentSort] = useState<SortOption>('DEFAULT');

    const sortedTasks = useMemo(() => {
        return getSortedTasks(tasks, currentSort);
    }, [tasks, currentSort]);

    const groupedTasks = useMemo(() => {
        return groupTasksByDate(tasks);
    }, [tasks]);

    if (tasks.length === 0) {
        return <p className="empty-state">No tasks created yet. Add one above!</p>;
    }

    return (
        <div className="task-list-wrapper">
            <div className="task-list-controls">
                <SortPanel currentSort={currentSort} onSortChange={setCurrentSort} />
            </div>

            <div className="task-list-content">
                {currentSort === 'DEFAULT' ? (
                    <div className="task-groups">
                        {Object.entries(groupedTasks).map(([date, items]) => (
                            <DateGroup
                                key={date}
                                date={date}
                                tasks={items}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="task-list">
                        {sortedTasks.map((task) => (
                            <ListElem
                                key={task.id}
                                task={task}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}