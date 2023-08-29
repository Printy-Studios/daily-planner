import { useField } from 'formik'
import { useState } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import InputBase from './InputBase'

type Props = {
    name: string,
    placeholder?: string,
    label: string
}

export default function ColorInput( props: Props) {

    const [ field, meta, helpers ] = useField(props.name)

    const [ showPicker, setShowPicker ] = useState<boolean>(false)

    const togglePicker = () => {
        setShowPicker(!showPicker)
    }

    const handleColorChange = (color: ColorResult) => {
        // console.log(e)
        field.onChange(color.hex)
        helpers.setValue(color.hex)

        setShowPicker(false)
    }

    const handlePickerClose = () => {
        setShowPicker(false)
    }

    return (
        <InputBase
            className='input-base-color-picker'
            label={props.label}
            name={props.name}
            direction='flex-row'
        >
            {/* <Field
                className='color-picker p-xs border-gray-medium focus:border-black'
                type='color'
                {...props}
            /> */}
            <button
                className='swatch'
                type='button'
                onClick={togglePicker}
                style={{
                    backgroundColor: field.value
                }}
            />
            { showPicker ? 
                <>
                    <div className='cover' onClick={handlePickerClose} />
                    <CirclePicker
                        color={field.value}
                        className='color-picker'
                        circleSpacing={0}
                        onChangeComplete={handleColorChange}
                    />
                    
                </>
                
            : null }
            
        </InputBase>
        
    )
}