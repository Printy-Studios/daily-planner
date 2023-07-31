import { createContext } from 'react'

import TaskGroup from 'types/TaskGroup'
import { TaskGroupDispatch } from './taskGroupReducer'

export const TaskGroupContext = createContext<TaskGroup[]>([])
export const TaskGroupDispatchContext = createContext<TaskGroupDispatch>(() => null) 