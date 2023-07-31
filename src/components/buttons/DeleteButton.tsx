import { PropsWithChildren, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLButtonElement> & {
    label?: string
}

export default function DeleteButton( { label = 'Delete', className, ...props }: PropsWithChildren<Props> ){
    return (
        <button
            className={`
                button p-y-s user-select-none button-outline-warn-medium w-full
                text-warn-medium active:text-white active:bg-warn-medium 
                transition-all-xs-ease-out text-base ${className || ''}
            `}
            {...props}
        >
            {label}
        </button>
    )
}