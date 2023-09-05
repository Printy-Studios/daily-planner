import { Link } from 'react-router-dom'

type Props = {
    text: string
    date: Date
}

export default function TaskGroupLink( {text, date}: Props ){

    return (
        <Link 
            className='flex w-full border-gray-medium p-xs justify-center items-center a-reset text-lg primary-button'
            to='task-group-edit'
            state={{
                date
            }}
        >
            {text}
        </Link>
    )
}