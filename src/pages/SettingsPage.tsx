//Core
import { useContext, useEffect, useMemo } from 'react'
import { Formik, Form, useFormikContext, FormikValues } from 'formik'

//Types
import { FontSize } from 'types/Settings'

//Components
import Select from 'components/forms/Select'
import Page from 'components/layout/Page'
import BackButton from 'components/buttons/BackButton'

//State
import SettingsContext from 'state/SettingsContext'

//Props
type Props = {}

function FormAutoSave() {
    const formik = useFormikContext()

    useEffect(() => {
        formik.submitForm()
    }, [formik.values])

    return null
}

type FormValues = {
    font_size: 'S' | 'M' | 'L' | 'XL'
}

/**
 * Settings page. This is the top level page for the settings
 */
export default function SettingsPage( {}: Props) {

    const { settings, updateSettings } = useContext(SettingsContext)

    const initialValues: FormValues = useMemo(() => {
        return {
            font_size: settings.font_size
        }
    }, [])

    const handleSubmit = ( values: FormValues ) => {
        console.log('values: ', values)
        console.log('submitting settings')
        updateSettings({
            font_size: FontSize[values.font_size]
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
                    <FormAutoSave />
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
                </Form>
            </Formik>
        </Page>
    )
}