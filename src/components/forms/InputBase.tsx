import { ErrorMessage } from 'formik'
import { HTMLAttributes, PropsWithChildren } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
    label?: string,
    name?: string
    direction?: 'flex-row' | 'flex-col'
}

export default function InputBase({ className, children, label, name, direction = 'flex-col' }: PropsWithChildren<Props>) {
    return(
        <div
            className={`flex ${direction === 'flex-row' ? direction + ' justify-between' : direction} ${className || ''}`}
        >
            {label ?
                <label
                    htmlFor={name}
                    className='text-xs text-gray-dark'
                >
                    {label}
                </label>
            : null}
            { children }
            <ErrorMessage 
                // clasName="text-xs"
                // component='span'
                render={(msg: string) => (
                    <span
                        className='text-xs text-warn-medium'
                    >
                        {msg}
                    </span>
                )}
                name={name}
            />
        </div>
    )
}