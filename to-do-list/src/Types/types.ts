export const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const;

export type priorityState = (typeof PRIORITY_OPTIONS)[number];

export interface listItm {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    priority: priorityState;
    isChecked: boolean;
}

export interface TaskContextType {
    tasks: listItm[];
    storageError: string | null;
    clearStorageError: () => void;
    addTask: (task: Omit<listItm, 'id' | 'isChecked'>) => void;
    editTask: (id: string, updatedData: Partial<Omit<listItm, 'id'>>) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;
}

export const SORT_OPTIONS = [
    { value: 'DEFAULT', label: '📅 Default (Grouped by Date)' },
    { value: 'ALPHABETICAL', label: '🔤 Alphabetical (A - Z)' },
    { value: 'DATE', label: '⏰ Date & Time (Flat)' },
    { value: 'PRIORITY', label: '🔥 Priority (High to Low)' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];