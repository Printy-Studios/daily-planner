import { 
    ReactNode,
    useState,
    HTMLAttributes
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
    header: ReactNode,
    contents: ReactNode
}

export default function Accordion( { style, header, contents }: Props ) {

    const [isShown, setIsShown] = useState<boolean>(false)

    const handleHeaderClick = () => {
        setIsShown( !isShown )
    }
    
    return (
        <div
            style={style}
        >
            <div
                onClick={handleHeaderClick}
            >
                {header}
            </div>
            <div
                style={{
                    display: isShown ? 'flex' : 'none'
                }}
            >
                {contents}
            </div>
        </div>
    )
}