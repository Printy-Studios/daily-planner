//Core
import { useContext } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';

//State
import { TaskGroupContext } from 'state/TaskGroupContext';

//Components
import TaskGroupList from 'components/TaskGroupList';
import TaskGroupLink from 'components/buttons/AddTaskGroupButton';
import Page from 'components/layout/Page';
import IconButton from 'components/buttons/IconButton';

export default function SchedulePage(){

    //Hooks
    const navigate = useNavigate()

    //State
    const taskGroups = useContext(TaskGroupContext)

    //Handler for 'Settings' button. Right now just navigates to /settings
    const handleSettingsClick = () => navigate('/settings')

    return (
        <Page
            headerRight={
                <IconButton
                    onClick={handleSettingsClick}
                    icon={
                        <Cog6ToothIcon className='w-xs-1/2 h-xs-1/2'/>
                    }
                />
            }
        >
            {/* Task Group List */}
            <TaskGroupList
                taskGroups={taskGroups}
            />
            {/* 'Add Task group' button */}
            <TaskGroupLink
                text='+'
            />
        </Page>
    )
}