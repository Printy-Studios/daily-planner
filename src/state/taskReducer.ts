import { Task } from 'types/Task'

type CreateAction = {
    type: 'create',
    data: Omit<Task, 'id'>
}

type Action = CreateAction

let max_id = 50

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
    }
}