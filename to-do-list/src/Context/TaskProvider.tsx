// core implementation of context provider (where the shared list lives)

import { useState, type ReactNode } from 'react';
import { type listItm } from '../Types/types';
import { TaskContext } from './TaskContext';

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<listItm[]>([]);

    const addTask = (newTaskData: Omit<listItm, 'id' | 'isChecked'>) => {
        const newTask: listItm = {
            ...newTaskData,
            id: crypto.randomUUID(),
            isChecked: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const toggleTaskComplete = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTaskComplete }}>
            {children}
        </TaskContext.Provider>
    );
}