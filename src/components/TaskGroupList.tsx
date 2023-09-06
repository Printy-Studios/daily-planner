//Core
import { useNavigate } from 'react-router-dom'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
//@ts-ignore
import Color from 'color'

//Types
import TaskGroup from 'types/TaskGroup'

//Components
import Accordion from './Accordion'
import IconButton from './buttons/IconButton'
import TaskList from './TaskList'

//Functions
import useTasks from 'functions/useTasks'
import { ID } from 'types/UtilTypes'

type Props = {
    taskGroups: TaskGroup[]
}

type TaskGroupListItemProps = {
    taskGroup: TaskGroup
    isLast: boolean
}

function TaskGroupListItem( {taskGroup, isLast = false}: TaskGroupListItemProps) {

    const { getTasksByGroup } = useTasks()

    const tasks = getTasksByGroup(taskGroup.id)

    const navigate = useNavigate()

    const handleEditClick = (task_group_id: ID) => {
        navigate('task-group-edit', { state: { id: task_group_id } })
    }

    const handleTaskAddClick = () => {
        navigate('task-edit', { state: { group_id: taskGroup.id } })
    }

    const color = Color(taskGroup.color)
    const color_surface = color.darken(0.2)

    return (
        <Accordion
            style={{
                borderBottom: isLast ? '' : `8px solid ${color_surface.hex()}`
            }}
            header={(
                <div
                    className='flex bg-gray-medium p-xs flex items-center gap-s'
                    style={{
                        backgroundColor: taskGroup.color
                    }}
                >
                    <div
                        className='font-bold'
                    >
                        {taskGroup.time.hrs.toString().padStart(2, '0')}:{taskGroup.time.mins.toString().padStart(2, '0')}
                    </div>
                    <div>
                        {taskGroup.name}
                    </div>
                    <IconButton 
                        onClick={() => handleEditClick(taskGroup.id)}
                        className='ml-auto'
                        icon={
                            <PencilSquareIcon 
                                className='w-xs-1/2'
                            />
                        }
                    />
                </div>
            )}
            contents={(
                <div
                    className='bg-gray-light w-full'
                    style={{
                        backgroundColor: color_surface.hex(),
                    }}
                >
                    <TaskList tasks={tasks}/>
                    <div className='p-s'>
                        <IconButton
                            onClick={handleTaskAddClick}
                            className='ml-auto'
                            icon={
                                <PlusIcon className='w-xs h-xs'/>
                            }
                        />
                    </div>
                    
                </div>
            )}
        />
    )
}

export default function TaskGroupList( {taskGroups}: Props) {
    return (
        <ul className='list-reset'>
            {taskGroups.map( (item, index) => (
                <li key={item.id}>
                    <TaskGroupListItem taskGroup={item} isLast={taskGroups.length === index} />
                </li>
            ))}
        </ul>
    )
}