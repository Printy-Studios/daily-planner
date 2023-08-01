//Core
import { Formik, Form } from 'formik'

//Components
import Select from 'components/forms/Select'
import Page from 'components/layout/Page'

//Props
type Props = {}

/**
 * Settings page. This is the top level page for the settings
 */
export default function SettingsPage( {}: Props) {



    return (
        <Page>
            <Formik
                initialValues={{}}
                onSubmit={() => {}}
            >
                <Form>
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