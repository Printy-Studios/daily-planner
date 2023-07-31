//Types
import { ID } from './UtilTypes'

enum TaskType {
    TASK = 'TASK',
    NOTE = 'NOTE'
}

type Task = {
    id: number
    type: TaskType
    name: string
    group_id: ID,
    description?: string
}

export { type Task, TaskType }