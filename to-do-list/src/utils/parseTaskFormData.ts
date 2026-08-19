import { type priorityState, PRIORITY_OPTIONS } from '../Types/types';

export interface ParsedTaskFormData {
    name: string;
    description: string;
    date: string;
    time: string;
    priority: priorityState;
}

export const isValidPriority = (value: unknown): value is priorityState => {
    return typeof value === 'string' && (PRIORITY_OPTIONS as readonly string[]).includes(value);
};

export function parseTaskFormData(
    formData: FormData,
    fallbackPriority: priorityState = 'medium'
): { parsed: ParsedTaskFormData | null; error: string | null } {
    const name = String(formData.get('name') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const date = String(formData.get('date') ?? '');
    const time = String(formData.get('time') ?? '');
    const rawPriority = formData.get('priority');

    if (!name) {
        return { parsed: null, error: 'Task name cannot be empty.' };
    }

    const priority: priorityState = isValidPriority(rawPriority)
        ? rawPriority
        : fallbackPriority;

    return {
        parsed: { name, description, date, time, priority },
        error: null,
    };
}