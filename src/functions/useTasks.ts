//Core
import { useContext } from 'react';

//Types
import { ID } from 'types/UtilTypes';
import { Task } from 'types/Task';

//State
import { TasksContext, TasksDispatchContext } from 'state/TasksContext';

export default function useTasks(){

    const tasks = useContext(TasksContext)
    const dispatchTasks = useContext(TasksDispatchContext)

    return {
        createTask: (task: Omit<Task, 'id'>) => 
            dispatchTasks({
                type: 'create',
                data: task
            }),
        deleteTask: (task_id: ID) =>
            dispatchTasks({
                type: 'delete',
                data: {
                    id: task_id
                }
            }),
        updateTask: (task: Omit<Partial<Task>, 'id'> & { id: ID }) =>
            dispatchTasks({
                type: 'update',
                data: task
            }),
        getTaskById: (task_id: ID) => {
            const task = tasks.find(task => task.id === task_id)
            if (!task) {
                throw new Error('Could not find task with id ' + task_id)
            } else {
                return task
            }
        },
        getTasksByGroup: (group_id: ID) => 
            tasks.filter(task => task.group_id === group_id)
    }
}