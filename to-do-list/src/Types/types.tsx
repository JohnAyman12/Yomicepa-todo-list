export enum priorityState {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum ListActionType {
    ADD = 'add',
    DELETE = 'delete',
    EDIT = 'edit',
}

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
    addTask: (task: Omit<listItm, 'id' | 'isChecked'>) => void;
    editTask: (id: string, updatedData: Partial<Omit<listItm, 'id'>>) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;
}

export enum SortOption {
    DEFAULT = 'DEFAULT',
    ALPHABETICAL = 'ALPHABETICAL',
    DATE = 'DATE',
    PRIORITY = 'PRIORITY',
}