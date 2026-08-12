// core implementation of context provider (where the shared list lives) and manipulation functions

import { useState, useEffect, type ReactNode } from 'react';
import { type listItm } from '../Types/types';
import { TaskContext } from './TaskContext';

const STORAGE_KEY = 'todo_app_tasks';

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<listItm[]>(() => {
        try {
            const savedTasks = localStorage.getItem(STORAGE_KEY);
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch (error) {
            console.error("Failed to load tasks from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error("Failed to save tasks to localStorage:", error);
        }
    }, [tasks]);

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
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTaskComplete }}>
            {children}
        </TaskContext.Provider>
    );
}