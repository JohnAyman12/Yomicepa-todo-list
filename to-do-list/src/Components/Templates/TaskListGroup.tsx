import { useState } from 'react';
import { type listItm, priorityState, SortOption } from '../../Types/types';
import DateGroup from '../Organisms/DateGroup';
import ListElem from './ListElem';
import SortPanel from './SortPanel';
import '../../styles/TaskListGroup.css'

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
    const [currentSort, setCurrentSort] = useState<SortOption>(SortOption.DEFAULT);

    if (tasks.length === 0) {
        return <p className="empty-state">No tasks created yet. Add one above!</p>;
    }

    const priorityRank: Record<priorityState, number> = {
        [priorityState.HIGH]: 3,
        [priorityState.MEDIUM]: 2,
        [priorityState.LOW]: 1,
    };

    const getSortedTasks = () => {
        const listCopy = [...tasks];

        switch (currentSort) {
            case SortOption.DEFAULT:
                return listCopy;

            case SortOption.ALPHABETICAL:
                return listCopy.sort((a, b) => a.name.localeCompare(b.name));

            case SortOption.PRIORITY:
                return listCopy.sort(
                    (a, b) => priorityRank[b.priority] - priorityRank[a.priority]
                );

            case SortOption.DATE:
                return listCopy.sort((a, b) => {
                    const dateTimeA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
                    const dateTimeB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
                    return dateTimeA - dateTimeB;
                });

            default: {
                const _exhaustiveCheck: never = currentSort;
                console.error(`Unhandled sort option: ${JSON.stringify(_exhaustiveCheck)}`);

                return listCopy;
            }
        }
    };

    const groupTasksByDate = (taskList: listItm[]) => {
        const sortedTasks = [...taskList].sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
            const dateTimeB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();

            if (dateTimeA !== dateTimeB) {
                return dateTimeA - dateTimeB;
            }
            return priorityRank[b.priority] - priorityRank[a.priority];
        });

        const grouped: Record<string, listItm[]> = {};
        sortedTasks.forEach((task) => {
            const dateKey = task.date;
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(task);
        });

        return grouped;
    };

    return (
        <div className="task-list-wrapper">
            <div className="task-list-controls">
                <SortPanel currentSort={currentSort} onSortChange={setCurrentSort} />
            </div>

            <div className="task-list-content">
                {currentSort === SortOption.DEFAULT ? (
                    <div className="task-groups">
                        {Object.entries(groupTasksByDate(tasks)).map(([date, items]) => (
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
                ) : (
                    <div className="task-list">
                        {getSortedTasks().map((task) => (
                            <ListElem
                                key={task.id}
                                {...task}
                                onToggleComplete={onToggleComplete}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}