//Core
import { useContext, useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';

//State
import { TaskGroupContext } from 'state/TaskGroupContext';

//Components
import TaskGroupList from 'components/TaskGroupList';
import TaskGroupLink from 'components/buttons/AddTaskGroupButton';
import Page from 'components/layout/Page';
import IconButton from 'components/buttons/IconButton';
import DaySelector from 'components/input/DaySelector';

export default function SchedulePage(){

    //Hooks
    const navigate = useNavigate()

    //State
    const taskGroups = useContext(TaskGroupContext)

    //Handler for 'Settings' button. Right now just navigates to /settings
    const handleSettingsClick = () => navigate('/settings')

    const [ currentDate, setCurrentDate ] = useState<Date>(new Date())

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
            {/* Day Selector */}
            <DaySelector
                value={currentDate}
                onChange={setCurrentDate}
            />
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