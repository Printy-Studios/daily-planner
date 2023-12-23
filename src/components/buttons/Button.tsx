import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    // color: string
    variant?: 'primary' | 'secondary'
    outline?: boolean
}

export default function Button( { outline, variant = 'secondary', ...props }: Props) {
    return (
        <button
            className={`${ outline ? 'button-outline' : ''} ${ variant === 'primary' ? 'button-primary' : 'button-secondary'}`}
            {...props}
        >

        </button>
    )
}