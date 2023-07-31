import { 
    ReactNode,
    useState
} from 'react'

type Props = {
    header: ReactNode,
    content: ReactNode
}

export default function Accordion( {header, content}: Props ) {

    const [isShown, setIsShown] = useState<boolean>(false)

    const handleHeaderClick = () => {
        setIsShown( !isShown )
    }
    
    return (
        <div
            onClick={handleHeaderClick}
        >
            <div>
                {header}
            </div>
            <div
                style={{
                    display: isShown ? 'flex' : 'none'
                }}
            >
                {content}
            </div>
        </div>
    )
}