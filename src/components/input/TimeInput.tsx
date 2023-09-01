import { Field } from 'formik'
import InputBase from './InputBase'

type Props = {
    name: string
    label: string
}

export default function TimeInput( { name, label }: Props) {
    return (
        <InputBase
            label={label}
            name={name}
        >
            <Field 
                name={ name }
                className='w-full p-xs border-gray-medium'
                type='time'
            />
        </InputBase>
    )
}