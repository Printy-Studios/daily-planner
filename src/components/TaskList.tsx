import { Task, TaskType } from 'types/Task'

type TaskListItemProps = {
    task: Task
}

type Props = {
    tasks: Task[]
}

function TaskListItem( {task}: TaskListItemProps) {
    return (
        <div
            className='flex flex-row flex-wrap items-center gap-x-xs p-xxs p-l-s'
        >
            <div className='min-w-xs flex items-center justify-center'>
                {task.type === TaskType.TASK ?
                    <input type='checkbox' className='m-none'/>
                :   
                    <div className='round bg-gray-darker w-xxs h-xxs'/>
                }
            </div>
            
            <span
                className='flex border-box flex-grow font-semibold'
                style={{
                    paddingBottom: '3px'
                }}
            >
                {task.title}
            </span>
            
            {task.description ? 
                <div 
                    className='w-full text-s text-gray-darker'
                    style={{
                        paddingLeft: '20px'
                    }}
                >
                    {task.description}
                </div>
            : null}
        </div>
    )
}

export default function TaskList( { tasks }: Props ) {
    return (
        <li className='divide-last-gray-dark'>
            {tasks.map( task => <TaskListItem task={task} /> )}
        </li>
    )
}