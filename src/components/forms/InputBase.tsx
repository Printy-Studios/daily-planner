import { ErrorMessage } from 'formik'
import { PropsWithChildren } from 'react'

type Props = {
    label?: string,
    name?: string
}

export default function InputBase({ children, label, name }: PropsWithChildren<Props>) {
    return(
        <div>
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