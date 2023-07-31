//Core
import { useContext } from 'react';

//Types
import { ID } from 'types/UtilTypes';

//State
import { TasksContext } from 'state/TasksContext';

export default function useTasks(){

    const tasks = useContext(TasksContext)

    return {
        getTasksByGroup: (group_id: ID) => 
            tasks.filter(task => task.group_id === group_id)
    }
}