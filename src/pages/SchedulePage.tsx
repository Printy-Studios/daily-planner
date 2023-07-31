import TaskGroup from 'types/TaskGroup';

import TaskGroupList from 'components/TaskGroupList';
import TaskGroupLink from 'components/buttons/AddTaskGroupButton';
import { useContext } from 'react';
import { TaskGroupContext } from 'state/TaskGroupContext';

export default function SchedulePage(){

    const taskGroups = useContext(TaskGroupContext)

    return (
        <div
            className='flex flex-col gap-m p-s'
        >
            <TaskGroupList
                taskGroups={taskGroups}
            />
            <TaskGroupLink
                text='+'
            />
        </div>
    )
}