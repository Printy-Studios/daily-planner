//Core
import { Field } from 'formik';
import { SelectHTMLAttributes } from 'react';

import InputBase from './InputBase';

type SelectOption = {
    value: string,
    label: string
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string,
    name: string,
    options: SelectOption[]
}

export default function Select( {options, label, name, ...props}: Props) {
    return (
        <InputBase
            direction='flex-row'
            label={label}
            name={name}
        >
            <Field
                name={name}
                component='select'
            >
                { options.map( option => 
                    (<option value={option.value}>{option.label}</option>)
                )}
            </Field>        
        </InputBase>
    )
}