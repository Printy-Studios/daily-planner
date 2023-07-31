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
        getTasksByGroup: (group_id: ID) => 
            tasks.filter(task => task.group_id === group_id)
    }
}