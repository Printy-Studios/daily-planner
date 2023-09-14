//Types
import Time from './Time'
import { ID } from './UtilTypes'

//Task group
type TaskGroup = {
    id: ID //ID of task group. Most be unique
    name: string //Name of task group
    time: Time //Time of task group
    date: Date //Date of task group
    color: string //Color of the task group as displayed in task group lists
}

type TaskGroupPartial = Omit<Partial<TaskGroup>, 'id'> & {id: ID}

type TaskGroupNoID = Omit<TaskGroup, 'id'>

export { 
    type TaskGroupNoID, 
    type TaskGroupPartial
}

export default TaskGroup