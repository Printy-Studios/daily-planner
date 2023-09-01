import { Field } from 'formik'
import { HTMLAttributes, TextareaHTMLAttributes } from 'react'

import InputBase from './InputBase'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string,
    placeholder?: string,
    label: string
}

export default function TextArea(props: Props) {
    return (
        <InputBase
            label={props.label}
            name={props.name}
        >
            <Field
                component='textarea'
                className={`
                    w-full p-xs border-gray-medium focus:border-black 
                    max-w-full
                `}
                {...props}
            />
        </InputBase>
    )
}