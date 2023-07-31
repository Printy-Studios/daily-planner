import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import IconButton from './IconButton';


export default function BackButton() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <IconButton
            onClick={handleClick}
            icon={<ArrowLeftIcon className='w-xs-1/2 h-xs-1/2'/>}
        />
    )
}