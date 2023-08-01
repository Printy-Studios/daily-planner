//Types
import { ID } from './UtilTypes'

//Task type
enum TaskType {
    TASK = 'TASK',
    NOTE = 'NOTE'
}

type Task = {
    id: ID //ID of task. Must be unique
    type: TaskType //Type of task
    name: string //Name of task
    group_id: ID, //ID of group the task belongs to
    description?: string /*Description of task. Displayed in task lists and in
                           task editor*/
}

export { type Task, TaskType }