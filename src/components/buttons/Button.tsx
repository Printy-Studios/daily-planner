import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: string
    outline?: boolean
}

export default function Button( { color, outline, ...props }: Props) {
    return (
        <button
            className={`${ outline ? 'button-outline' : ''}`}
            {...props}
        >

        </button>
    )
}