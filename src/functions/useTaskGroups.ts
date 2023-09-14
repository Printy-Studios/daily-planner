//Core
import { useContext } from 'react';

//Types
import TaskGroup, { TaskGroupNoID, TaskGroupOptional } from 'types/TaskGroup';
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
        createTaskGroup: (data: TaskGroupNoID) => {
            dispatchTaskGroups({
                type: 'create',
                data: {
                    ...data
                }
            })
        },
        updateTaskGroup: (data: TaskGroupPartial) => {
            dispatchTaskGroups({
                type: 'update',
                data: {
                    ...data
                }
            })
        },
        /**
         * Get task group by id. Throws error if not found.
         * @param {ID} id ID of task group.
         * 
         * @returns {TaskGroup} Task group with matching id.
         */
        getTaskGroupById: (id: ID): TaskGroup => {
            //Find task group by id from all task groups
            const task_group = taskGroups.find( group => group.id === id);

            
            if (task_group) {
                //If task group found, return it
                return task_group;
            } else {
                //Otherwise throw error
                throw new Error('Could not find task group by id' + id)
            }
        }
    }
}