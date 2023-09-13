//Core
import { useContext, useEffect, useMemo } from 'react'
import { Formik, Form, useFormikContext } from 'formik'

//Types
import { FontSize, ThemeOption } from 'types/Settings'

//Components
import Select from 'components/input/Select'
import Page from 'components/layout/Page'
import BackButton from 'components/buttons/BackButton'
import FormAutoSave from 'components/misc/FormAutoSave'

//State
import SettingsContext from 'state/SettingsContext'

//Props
//type Props = {}



//Form values type
type FormValues = {
    font_size: 'S' | 'M' | 'L' | 'XL'
    theme: 'DARK' | 'LIGHT'
}

/**
 * Settings page. This is the top level page for the settings
 */
export default function SettingsPage() {

    //State
    const { settings, updateSettings } = useContext(SettingsContext)

    //Set initial values to setting's values
    const initialValues: FormValues = useMemo(() => {
        return {
            font_size: settings.font_size,
            theme: settings.theme
        }
    }, [])

    //On form submit(form submits on each input value change)
    const handleSubmit = ( values: FormValues ) => {
        //Update settings with new values
        updateSettings({
            font_size: FontSize[values.font_size],
            theme: ThemeOption[values.theme]
        })
    }

    return (
        <Page
            headerLeft={
                <BackButton />
            }
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form>
                    {/* Component to enable auto-save */}
                    <FormAutoSave />
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
                </Form>
            </Formik>
        </Page>
    )
}