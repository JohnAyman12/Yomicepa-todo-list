// creator of original contet object that allows sharing data between DOM nodes

import { createContext } from 'react';
import { type TaskContextType } from '../../Types/types';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
// this undefined in generic prevents any node outside the provider scope from using the context