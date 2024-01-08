//Core
import { useContext, useMemo } from 'react'

//Types
import { FontSize, ThemeOption } from 'types/Settings'

//Components
import Select from 'components/input/Select'
import FormPage from 'components/layout/FormPage'

//State
import SettingsContext from 'state/SettingsContext'

//Functions
import usePage from 'functions/usePage'
import ColorInput from 'components/input/ColorInput'

//Form values type
type FormValues = {
    font_size: 'S' | 'M' | 'L' | 'XL'
    theme: 'DARK' | 'LIGHT'
    default_task_group_color: string
}

/**
 * Settings page. This is the top level page for the settings
 */
export default function SettingsPage() {

    //Hooks
    const { pageState } = usePage();

    //State
    const { settings, updateSettings } = useContext(SettingsContext)

    //Set initial values to setting's values
    const initialValues: FormValues = useMemo(() => {
        return {
            font_size: settings.font_size,
            theme: settings.theme,
            default_task_group_color: settings.default_task_group_color
        }
    }, [])

    //On form submit(form submits on each input value change)
    const handleSubmit = ( values: FormValues ) => {
        //Update settings with new values
        updateSettings({
            font_size: FontSize[values.font_size],
            theme: ThemeOption[values.theme],
            default_task_group_color: values.default_task_group_color
        })
    }

    return (
        <FormPage<FormValues>
            id='settings-form'
            initialValues={initialValues}
            onSubmit={handleSubmit}
            autoSave
            pageState={pageState}
            // headerLeft={
            //     <BackButton />
            // }
        >
            {/* Font size */}
            <Select
                label='Font size'
                name='font_size'
                options={[
                    {
                        label: 'Small',
                        value: 'S'
                    },
                    {
                        label: 'Regular',
                        value: 'M'
                    },
                    {
                        label: 'Large',
                        value: 'L'
                    },
                    {
                        label: 'Extra Large',
                        value: 'XL'
                    }
                ]}
            />
            {/* Theme */}
            <Select
                label='Theme'
                name='theme'
                options={[
                    {
                        label: 'Dark',
                        value: 'DARK'
                    },
                    {
                        label: 'Light',
                        value: 'LIGHT'
                    }
                ]}
            />
            <ColorInput 
                name='default_task_group_color'
                label='Default Task Group Color'
            />
        </FormPage>
    )
}