import { ReactNode, ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ReactNode
}
export default function IconButton( {icon, className, ...props}: Props ) {

    //const handle

    return (
        <button
            className={`
                button-reset icon-button relative w-fit h-fit 
                ${ className || ''}
            `}
            {...props}
        >
            {icon}
            <div className='icon-button-circle absolute'/>
        </button>
    )
}