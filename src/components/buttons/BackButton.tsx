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
            icon={<ArrowLeftIcon className='icon'/>}
        />
    )
}