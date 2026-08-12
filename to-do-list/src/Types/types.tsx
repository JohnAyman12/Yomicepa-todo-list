export enum priorityState {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export type listItm = {
    name: string,
    description: string,
    date: string,
    time: string,
    isChecked: boolean,
    priority: priorityState,
}