//Core
import { useContext } from 'react';

//Types
import TaskGroup, { TaskGroupNoID, TaskGroupPartial } from 'types/TaskGroup';
import { ID } from 'types/UtilTypes';

//State
import { TaskGroupContext } from 'state/TaskGroupContext';
import { TaskGroupDispatchContext } from 'state/TaskGroupContext';

/**
 * Hook that lets you access and modify task groups.
 */
export default function useTaskGroups() {

    //All task groups
    const taskGroups = useContext(TaskGroupContext)
    const dispatchTaskGroups = useContext(TaskGroupDispatchContext)
    
    return {
        /**
         * Get task group by id. Throws error if not found.
         * @param {ID} id ID of task group.
         * 
         * @returns {TaskGroup} Task group with matching id.
         */
        getTaskGroupById: (id: ID | undefined): TaskGroup | undefined => {
            //Find task group by id from all task groups
            const task_group = taskGroups.find( group => group.id === id);

            console.log(taskGroups)

            if (task_group) {
                //If task group found, return it
                return task_group;
            } else {
                //Otherwise throw error
                return undefined;
                //throw new Error('Could not find task group by id ' + id)
            }
        },
        /**
         * Create new task group from data
         * @param { TaskGroupNoID } data Task group to create 
         */
        createTaskGroup: (data: TaskGroupNoID) => {
            dispatchTaskGroups({
                type: 'create',
                data: {
                    ...data
                }
            })
        },
        /**
         * Update task group from data
         * @param { TaskGroupPartial } data Task group to update. Only `id` required
         */
        updateTaskGroup: (data: TaskGroupPartial) => {
            dispatchTaskGroups({
                type: 'update',
                data: {
                    ...data
                }
            })
        },
        /**
         * Delete task group
         * @param { TaskGroupPartial } data Task group to delete. Only `id` required
         */
        deleteTaskGroup: (data: TaskGroupPartial) => {
            dispatchTaskGroups({
                type: 'delete',
                data: {
                    id: data.id
                }
            })
        },
        /**
         * Set state of all task groups to the provided array of task groups
         * @param { TaskGroup[] } data Task groups to set the state to
         */
        setAllTaskGroups: (data: TaskGroup[]) => {
            dispatchTaskGroups({
                type: 'set-all',
                data
            })
        },
        
    }
}