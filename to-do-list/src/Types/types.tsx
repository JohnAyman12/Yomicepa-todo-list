export enum priorityState {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export type listItm = {
    name: string,
    description: string,
    date: Date,
    isChecked: boolean,
    priority: priorityState,
}