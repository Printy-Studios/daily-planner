//Types
import Time from './Time'
import { ID } from './UtilTypes'

//Task group
type TaskGroup = {
    id: ID //ID of task group. Most be unique
    name: string //Name of task group
    time: Time //Time of task group
}

export default TaskGroup