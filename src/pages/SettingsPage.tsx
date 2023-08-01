//Core
import { Formik, Form, useFormikContext } from 'formik'

//Components
import Select from 'components/forms/Select'
import Page from 'components/layout/Page'
import BackButton from 'components/buttons/BackButton'
import { useEffect } from 'react'

//Props
type Props = {}

function FormAutoSave() {
    const formik = useFormikContext()

    useEffect(() => {
        formik.submitForm()
    }, [formik.values])

    return null
}

/**
 * Settings page. This is the top level page for the settings
 */
export default function SettingsPage( {}: Props) {
    return (
        <Page
            headerLeft={
                <BackButton />
            }
        >
            <Formik
                initialValues={{}}
                onSubmit={() => {
                    console.log('submitting formik form')
                }}
            >
                <Form>
                    <FormAutoSave />
                    <Select
                        label='Font size'
                        name='font-size'
                        options={[
                            {
                                label: 'Small',
                                value: 's'
                            },
                            {
                                label: 'Regular',
                                value: 'm'
                            },
                            {
                                label: 'Large',
                                value: 'l'
                            },
                            {
                                label: 'Extra Large',
                                value: 'xl'
                            }
                        ]}
                    />
                </Form>
            </Formik>
        </Page>
    )
}