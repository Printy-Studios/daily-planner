//Core
import { useMemo } from 'react'
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

    // const color = 
    

    // const task_item_divider_color = useMemo()color_surface.darken(0.1)

    const color = useMemo(() => {
        const main = Color(taskGroup.color)
        const surface = main.darken(0.2)
        return {
            main,
            surface,
            task_item_divider: surface.darken(0.2)
        }
    }, [taskGroup.color])

    const is_surface_dark = useMemo(() => {
        return color.surface.isDark()
    }, [taskGroup.color])
    const is_header_dark = useMemo(() => {
        return color.main.isDark()
    }, [taskGroup.color])

    const text_color = useMemo(() => {
        return is_header_dark ? '#ffffff' : '#000000'
    }, [taskGroup.color])

    return (
        <Accordion
            style={{
                borderBottom: isLast ? '' : `8px solid ${color.surface.hex()}`
            }}
            header={(
                <div
                    className='flex bg-gray-medium p-xs flex items-center gap-s'
                    style={{
                        backgroundColor: taskGroup.color,
                        color: text_color
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
                                style={{
                                    color: text_color
                                }}
                            />
                        }
                    />
                </div>
            )}
            contents={(
                <div
                    className='bg-gray-light w-full'
                    style={{
                        backgroundColor: color.surface.hex(),
                    }}
                >
                    <TaskList 
                        tasks={tasks}
                        variant={is_surface_dark ? 'light' : 'dark'}
                        dividerColor={color.task_item_divider.hex()}
                    />
                    <div className='p-s'>
                        <IconButton
                            onClick={handleTaskAddClick}
                            className='ml-auto'
                            icon={
                                <PlusIcon 
                                    className='w-xs h-xs'
                                    style={{
                                        color: is_surface_dark ? '#ffffff' : '#000000'
                                    }}    
                                />
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
                    {item.id}
                    <TaskGroupListItem taskGroup={item} isLast={taskGroups.length === index} />
                </li>
            ))}
        </ul>
    )
}