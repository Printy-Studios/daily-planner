import { Field } from 'formik'
import InputBase from './InputBase'

type Props = {
    name: string,
    placeholder?: string,
    label: string
}

export default function TextInput( props: Props) {
    return (
        <InputBase
            label={props.label}
            name={props.name}
        >
            <Field
                className='w-full p-xs border-gray-medium focus:border-black'
                {...props}
            />
        </InputBase>
        
    )
}