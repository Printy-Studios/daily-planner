import { Task } from 'types/Task'

type TaskListItemProps = {
    task: Task
}

type Props = {
    tasks: Task[]
}

function TaskListItem( {task}: TaskListItemProps) {
    return (
        <div
            className='flex flex-row items-center gap-xs p-l-xs'
        >
            <input type='checkbox' />
            <span
                className='border-box'
                style={{
                    paddingBottom: '3px'
                }}
            >
                {task.title}
            </span>
            
        </div>
    )
}

export default function TaskList( { tasks }: Props ) {
    return (
        <li>
            {tasks.map( task => <TaskListItem task={task} /> )}
        </li>
    )
}