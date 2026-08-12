// core implementation of context provider (where the shared list lives) and manipulation functions

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

    const editTask = (id: string, updatedData: Partial<Omit<listItm, 'id'>>) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, ...updatedData } : task
            )
        );
        console.log("Task Edited: ", updatedData);
    };

    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const toggleTaskComplete = (id: string) => {
        const taskToToggle = tasks.find(task => task.id === id);
        if (taskToToggle) {
            const updatedTask = { ...taskToToggle, isChecked: !taskToToggle.isChecked };
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? updatedTask : task))
            );
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTaskComplete }}>
            {children}
        </TaskContext.Provider>
    );
}