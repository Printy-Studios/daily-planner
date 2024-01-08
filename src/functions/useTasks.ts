//Core
import { useContext } from 'react';

//Types
import { ID } from 'types/UtilTypes';
import { Task } from 'types/Task';

//State
import { TasksContext, TasksDispatchContext } from 'state/TasksContext';

/**
 * Hook that lets you access and modify tasks
 */
export default function useTasks(){

    //All tasks
    const tasks = useContext(TasksContext)
    //Tasks dispatch
    const dispatchTasks = useContext(TasksDispatchContext)

    return {
        /**
         * Create new task.
         * 
         * @param {Omit<Task, 'id'>} task Task to create.
         * @returns {void}
         */
        createTask: (task: Omit<Task, 'id'>): void => 
            dispatchTasks({
                type: 'create',
                data: task
            }),
        /**
         * Delete task by ID.
         * 
         * @param {ID} task_id ID of task to delete 
         */
        deleteTask: (task_id: ID): void =>
            dispatchTasks({
                type: 'delete',
                data: {
                    id: task_id
                }
            }),
        /**
         * Update existing task.
         * 
         * @param {Omit<Partial<Task>, 'id'>} task Task to update. Any properties
         * added to the parameter will overwrite the existing task's repsective
         * properties
         */
        updateTask: (task: Omit<Partial<Task>, 'id'> & { id: ID }): void =>
            dispatchTasks({
                type: 'update',
                data: task
            }),
        /**
         * Get task by ID.
         * 
         * @param {ID} task_id ID of task to retrieve
         * 
         * @returns {Task} Task with given ID
         */
        getTaskById: (task_id: ID): Task | undefined => {
            const task = tasks.find(task => task.id === task_id);
            if (!task) {
                return undefined;
            } else {
                //Otherwise return task
                return task;
            }
        },
        /**
         * Get all tasks of a given group.
         * 
         * @param {ID} group_id ID of group
         * @returns {Task[]} All tasks in the specified group
         */
        getTasksByGroup: (group_id: ID): Task[] => 
            tasks.filter(task => task.group_id === group_id)
    }
}