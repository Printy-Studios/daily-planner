import { Link } from 'react-router-dom'

type Props = {
    text: string
}

export default function TaskGroupLink( {text}: Props ){

    return (
        <Link 
            className='flex w-full border-gray-medium p-xs justify-center items-center a-reset text-lg'
            to='task-group-edit'
        >
            {text}
        </Link>
    )
}