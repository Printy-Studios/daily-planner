//Types
import { Task } from 'types/Task'
import { ID } from 'types/UtilTypes'


//Action types
type CreateAction = {
    type: 'create',
    data: Omit<Task, 'id'>
}

type UpdateAction = {
    type: 'update',
    data: Omit<Partial<Task>, 'id'> & { id: ID }
}

type DeleteAction = {
    type: 'delete',
    data: Omit<Partial<Task>, 'id'> & { id: ID }
}

type Action = CreateAction | DeleteAction | UpdateAction

let max_id = 50

//Dispatch function type
export type TaskDispatch = (action: Action) => void

export default function taskReducer(tasks: Task[], action: Action) {
    switch(action.type){
        case 'create': {
            const new_tasks: Task[] = [...tasks]
            new_tasks.push({
                id: max_id++,
                ...action.data
            })

            return new_tasks
        }
        case 'update': {
            const new_tasks: Task[] = [...tasks];

            const index = new_tasks.findIndex(task => 
                task.id === action.data.id
            )

            const updated_task: any = new_tasks[index]

            //Replace existing group values with the new values( but only the
            //ones that were provided)
            for (const key in action.data) {
                const keyTyped = key as keyof Task
                if (keyTyped === 'id') {
                    continue
                }
                updated_task[keyTyped] = action.data[keyTyped]
            }

            new_tasks[index] = updated_task

            return new_tasks;
        }
        case 'delete': {
            return tasks.filter(task => task.id !== action.data.id)
        }
    }
}