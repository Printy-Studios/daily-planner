//Types
import { ID } from './UtilTypes'

enum TaskType {
    TASK = 'task',
    NOTE = 'NOTE'
}

type Task = {
    id: number
    type: TaskType
    title: string
    group_id: ID,
    description?: string
}

export { type Task, TaskType }