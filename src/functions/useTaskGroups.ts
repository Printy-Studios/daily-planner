import { useContext } from 'react';
import { TaskGroupContext } from 'state/TaskGroupContext';
import TaskGroup from 'types/TaskGroup';

type ID = number;

export default function useTaskGroups() {

    const taskGroups = useContext(TaskGroupContext)
    
    return {
        getTaskGroupById: (id: ID): TaskGroup => {
            const task_group = taskGroups.find( group => group.id === id);
            if (task_group) {
                return task_group;
            } else {
                throw new Error('Could not find task group by id' + id)
            }
        }
    }
}