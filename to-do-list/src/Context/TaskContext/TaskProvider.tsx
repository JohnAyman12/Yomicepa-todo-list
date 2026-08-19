// core implementation of context provider (where the shared list lives) and manipulation functions

import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { type listItm, type priorityState } from '../../Types/types';
import { TaskContext } from './TaskContext';

const STORAGE_KEY = 'todo_app_tasks';
const VALID_PRIORITIES: priorityState[] = ['high', 'medium', 'low'];

const isListItm = (item: unknown): item is listItm => {
    if (typeof item !== 'object' || item === null) return false;

    const t = item as Record<string, unknown>;

    return (
        typeof t.id === 'string' &&
        typeof t.name === 'string' &&
        typeof t.description === 'string' &&
        typeof t.date === 'string' &&
        typeof t.time === 'string' &&
        typeof t.isChecked === 'boolean' &&
        typeof t.priority === 'string' &&
        VALID_PRIORITIES.includes(t.priority as priorityState)
    );
};

const parseAndValidateTasks = (rawJson: string | null): listItm[] => {
    if (!rawJson) return [];

    try {
        const parsed = JSON.parse(rawJson);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(isListItm);
    } catch {
        return [];
    }
};

const saveToLocalStorage = (tasks: listItm[]): string | null => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return null;
    } catch {
        return 'Warning: Changes could not be saved to local storage. You may be out of space or in Private Mode.';
    }
};

export function TaskProvider({ children }: { children: ReactNode }) {
    const [storageError, setStorageError] = useState<string | null>(null);

    const [tasks, setTasks] = useState<listItm[]>(() => {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        return parseAndValidateTasks(savedTasks);
    });

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                const validatedTasks = parseAndValidateTasks(e.newValue);
                setTasks(validatedTasks);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateTasksAndPersist = useCallback((updateFn: (prev: listItm[]) => listItm[]) => {
        let nextTasksState: listItm[] = [];

        setTasks((prevTasks) => {
            nextTasksState = updateFn(prevTasks);
            return nextTasksState;
        });

        const err = saveToLocalStorage(nextTasksState);
        setStorageError((prevError) => (prevError !== err ? err : prevError));
    }, []);

    const clearStorageError = useCallback(() => {
        setStorageError(null);
    }, []);

    const addTask = useCallback((newTaskData: Omit<listItm, 'id' | 'isChecked'>) => {
        const newTask: listItm = {
            ...newTaskData,
            id: crypto.randomUUID(),
            isChecked: false,
        };
        updateTasksAndPersist((prev) => [...prev, newTask]);
    }, [updateTasksAndPersist]);

    const editTask = useCallback((id: string, updatedData: Partial<Omit<listItm, 'id'>>) => {
        updateTasksAndPersist((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
        );
    }, [updateTasksAndPersist]);

    const deleteTask = useCallback((id: string) => {
        updateTasksAndPersist((prev) => prev.filter((task) => task.id !== id));
    }, [updateTasksAndPersist]);

    const toggleTaskComplete = useCallback((id: string) => {
        updateTasksAndPersist((prev) =>
            prev.map((task) => (task.id === id ? { ...task, isChecked: !task.isChecked } : task))
        );
    }, [updateTasksAndPersist]);

    const contextValue = useMemo(
        () => ({
            tasks,
            storageError,
            clearStorageError,
            addTask,
            editTask,
            deleteTask,
            toggleTaskComplete,
        }),
        [tasks, storageError, clearStorageError, addTask, editTask, deleteTask, toggleTaskComplete]
    );

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
}