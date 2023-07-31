
import TaskGroup from 'types/TaskGroup'
import Accordion from './Accordion'
import IconButton from './buttons/IconButton'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import TaskList from './TaskList'
import useTasks from 'functions/useTasks'

type Props = {
    taskGroups: TaskGroup[]
}

type TaskGroupListItemProps = {
    taskGroup: TaskGroup
}

function TaskGroupListItem( {taskGroup}: TaskGroupListItemProps) {

    const { getTasksByGroup } = useTasks()

    const tasks = getTasksByGroup(taskGroup.id)

    const navigate = useNavigate()

    const handleEditClick = (task_group_id: number) => {
        navigate('task-group-edit', { state: { id: task_group_id } } )
    }

    return (
        <Accordion
            header={(
                <div
                    className='flex bg-gray-medium p-xs flex items-center border-bottom-gray-dark gap-s'
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
            content={(
                <div
                    className='bg-gray-light w-full'
                >
                    <TaskList tasks={tasks}/>
                </div>
            )}
        />
    )
}

export default function TaskGroupList( {taskGroups}: Props) {
    return (
        <ul className='list-reset'>
            {taskGroups.map( item => (
                <li key={item.id}>
                    <TaskGroupListItem taskGroup={item} />
                </li>
            ))}
        </ul>
    )
}