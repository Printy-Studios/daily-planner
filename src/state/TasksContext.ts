import { createContext } from 'react';
import { Task } from 'types/Task';
import { TaskDispatch } from './taskReducer';

export const TasksContext = createContext<Task[]>([])
export const TasksDispatchContext = createContext<TaskDispatch>(() => {})