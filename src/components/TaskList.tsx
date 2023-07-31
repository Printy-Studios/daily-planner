import { Task } from 'types/Task'

type TaskListItemProps = {
    task: Task
}

type Props = {
    tasks: Task[]
}

function TaskListItem( {task}: TaskListItemProps) {
    return (
        <div>
            {task.title}
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