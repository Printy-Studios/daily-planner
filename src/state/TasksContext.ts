import { createContext } from 'react';
import { Task } from 'types/Task';

export const TasksContext = createContext<Task[]>([])