// #TODO change styles to semantic style
// #TODO avoid inline styles if not used with a variable

// Core
import useTasks from 'functions/useTasks'
import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

// Types
import { Task, TaskType } from 'types/Task'

type TaskListItemProps = {
    showDivider?: boolean // Whether to show a divider between items
    dividerColor: string // The color of the dicider
    variant: 'dark' | 'light' // Color variant
    task: Task // The task to display
}

/**
 * Single item for the TaskList component
 */
function TaskListItem({ task, variant, dividerColor, showDivider = true }: TaskListItemProps) {

    // Hooks
    const navigate = useNavigate()
    const tasks = useTasks();

    // Called when task item is clicked (not the checkbox)
    const handleTaskClick = () => {
        // Goto /task-edit and pass id of task as a param
        navigate('/task-edit', { state: {id: task.id} } )
    }

    // Called when checkbox is clicked
    const handleTaskCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        tasks.updateTask({
            id: task.id,
            completed: e.currentTarget.checked
        })
    }

    return (
        <div 
            className={
                `task-list-item flex flex-row flex-wrap items-center gap-x-xs p-xxs p-l-s
            `} 
            style={{
                borderBottom: showDivider ? `1px solid ${dividerColor}` : '' // Show divider if necessary
            }}
        >
            {/* Checkbox/dot */}
            <div 
                className='task-item-checkbox'
                
            >
                {task.type === TaskType.TASK ? // If task type is TASK, then display checkbox, otherwise display dot
                    <input 
                        type='checkbox' 
                        className='m-none'
                        checked={task.completed}
                        onChange={handleTaskCheckboxChange}
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
            {/* Task info (title/description) */}
            <div className='task-item-info' onClick={handleTaskClick}>
                {/* Title */}
                <span
                    className={`flex border-box flex-grow ${task.completed ? 'task-text-checked' : ''}`}
                    style={{
                        paddingBottom: '3px',
                        color: variant === 'dark' ? '#000000' : '#ffffff'
                    }}
                >
                    {task.name}
                </span>
                
                {/* Description, if there is one */}
                {task.description ?
                    <div 
                        className={`w-full text-s text-gray-darker ${task.completed ? 'task-text-checked' : ''}`}
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
    tasks: Task[] // Array of tasks to display
    variant: 'dark' | 'light' // Color variant
    dividerColor: string // Divider color
}

/**
 * Shows a list of tasks that you can check off or click on to edit
 */
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