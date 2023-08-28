import { Field } from 'formik'
import { useEffect, useRef, useState } from 'react'
import InputBase from './InputBase'

type Props = {
    name: string,
    placeholder?: string,
    label: string
}

export default function ColorInput( props: Props) {

    return (
        <InputBase
            label={props.label}
            name={props.name}
            direction='flex-row'
        >
            <Field
                className='color-picker p-xs border-gray-medium focus:border-black'
                type='color'
                {...props}
            />
        </InputBase>
        
    )
}