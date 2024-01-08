//Types
import TaskGroup from 'types/TaskGroup'
import { ID } from 'types/UtilTypes'


//Action types
type CreateAction = {
    type: 'create',
    data: Omit<TaskGroup, 'id'>
}

type UpdateAction = {
    type: 'update',
    data: Omit<Partial<TaskGroup>, 'id'> & {id: ID}
}

type DeleteAction = {
    type: 'delete',
    data: (Omit<Partial<TaskGroup>, 'id'> & {id: ID}) | {id: ID}
}

type SetAllAction = {
    type: 'set-all',
    data: TaskGroup[]
}

type Action = CreateAction | DeleteAction | UpdateAction | SetAllAction

let max_id = 10;

/**
 * Get a non-clashing ID for a task group
 * @param all_task_groups all of the task groups
 */
const getMaxID = (all_task_groups: TaskGroup[]) => {
    let max_id = 0;
    for(const task_group of all_task_groups) {
        if(task_group.id >= max_id) {
            max_id = task_group.id + 1;
        }
    }
    return max_id
}

//Dispatch function type
export type TaskGroupDispatch = (action: Action) => void

export default function taskGroupReducer(
    task_groups: TaskGroup[], 
    action: Action
): TaskGroup[] {
    switch(action.type){
        case 'create': {
            const new_task_groups: TaskGroup[] = [ ...task_groups ];
            const max_id = getMaxID(new_task_groups);
            new_task_groups.push({
                id: max_id,
                ...action.data
            });

            return new_task_groups;
        }
        case 'update': {
            const new_task_groups: TaskGroup[] = [...task_groups];

            const index = new_task_groups.findIndex(group => 
                group.id === action.data.id
            )

            const updated_group: any = new_task_groups[index]

            //Replace existing group values with the new values( but only the
            //ones that were provided)
            for (const key in action.data) {
                const keyTyped = key as keyof TaskGroup
                if (keyTyped === 'id') {
                    continue
                }
                updated_group[keyTyped] = action.data[keyTyped]
            }

            new_task_groups[index] = updated_group

            return new_task_groups;
        }
        case 'delete': {
            return task_groups.filter(group => group.id !== action.data.id)
        }
        case 'set-all': {
            return action.data
        }
    }
}