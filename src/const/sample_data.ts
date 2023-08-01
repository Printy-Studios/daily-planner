//Types
import { Task, TaskType } from 'types/Task'
import TaskGroup from 'types/TaskGroup'

/*
    Sample data used for testing/debug.
*/

//Task groups.
const sample_task_groups: TaskGroup[] = [
    {
        id: 0,
        name: '1',
        time: {
            hrs: 12,
            mins: 10
        }
    },
    {
        id: 1,
        name: '2',
        time: {
            hrs: 6,
            mins: 20
        }
    },
    {
        id: 2,
        name: '3',
        time: {
            hrs: 16,
            mins: 0
        }
    },
    {
        id: 3,
        name: '4',
        time: {
            hrs: 20,
            mins: 30
        }
    }
]

//Tasks.
const sample_tasks:Task[] = [
    {
        id: 0,
        type: TaskType.TASK,
        name: 'Task #1',
        group_id: 0
    },
    {
        id: 1,
        type: TaskType.NOTE,
        name: 'Note #1',
        group_id: 0,
        description: 'Some description for note'
    },
    {
        id: 2,
        type: TaskType.TASK,
        name: 'Task #3',
        group_id: 1
    },
    {
        id: 3,
        type: TaskType.TASK,
        name: 'Task #4',
        group_id: 0
    }
]

const sample: any = {
    task_groups: sample_task_groups,
    tasks: sample_tasks
}

export default sample