//Core
import { useContext } from 'react';
import { TaskGroupContext } from 'state/TaskGroupContext';
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';

//Types

//Components
import TaskGroupList from 'components/TaskGroupList';
import TaskGroupLink from 'components/buttons/AddTaskGroupButton';
import Page from 'components/layout/Page';
import IconButton from 'components/buttons/IconButton';



export default function SchedulePage(){

    const navigate = useNavigate()

    const taskGroups = useContext(TaskGroupContext)

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
            <TaskGroupList
                taskGroups={taskGroups}
            />
            <TaskGroupLink
                text='+'
            />
        </Page>
    )
}