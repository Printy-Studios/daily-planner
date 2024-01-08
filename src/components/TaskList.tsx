import { useNavigate } from 'react-router-dom'
import { Task, TaskType } from 'types/Task'

type TaskListItemProps = {
    showDivider?: boolean
    dividerColor: string
    variant: 'dark' | 'light'
    task: Task
}



function TaskListItem({ task, variant, dividerColor, showDivider = true }: TaskListItemProps) {

    const navigate = useNavigate()

    const handleTaskClick = () => {
        navigate('/task-edit', { state: {id: task.id} } )
    }

    return (
        <div 
            className={
                `task-list-item flex flex-row flex-wrap items-center gap-x-xs p-xxs p-l-s
            `}
            style={{
                borderBottom: showDivider ? `1px solid ${dividerColor}` : ''
            }}
        >
            <div 
                className='task-item-checkbox'
                
            >
                {task.type === TaskType.TASK ?
                    <input 
                        type='checkbox' 
                        className='m-none'
                    />
                :   
                    <div 
                        className='round bg-gray-darker w-xxs h-xxs'
                        style={{
                            backgroundColor: variant === 'dark' ? '#000000' : '#ffffff'
                        }}
                    />
                }
            </div>
            <div className='task-item-info' onClick={handleTaskClick}>
                <span
                    className='flex border-box flex-grow'
                    style={{
                        paddingBottom: '3px',
                        color: variant === 'dark' ? '#000000' : '#ffffff'
                    }}
                >
                    {task.name}
                </span>
                
                {task.description ? 
                    <div 
                        className='w-full text-s text-gray-darker'
                        style={{
                            color: variant === 'dark' ? '#000000' : '#b5b5b5'
                        }}
                    >
                        {task.description}
                    </div>
                : null}
            </div>
        </div>
    )
}

type TaskListProps = {
    tasks: Task[]
    variant: 'dark' | 'light'
    dividerColor: string
}

export default function TaskList( { tasks, variant = 'dark', dividerColor }: TaskListProps ) {
    return (
        <ul className='list-reset'>
            {tasks.map( (task, index) => 
                <TaskListItem 
                    key={task.id} 
                    task={task}
                    variant={variant}
                    dividerColor={dividerColor}
                /> 
            )}
        </ul>
    )
}