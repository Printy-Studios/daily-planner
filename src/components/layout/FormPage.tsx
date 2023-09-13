//Core
import { PropsWithChildren } from 'react'
import { Formik, Form } from 'formik'

//Components
import Page from './Page'

type FormPageProps<FormValuesT> = {
    autoSave: false
    initialValues: FormValuesT
    onSubmit: (values: FormValuesT) => void
}

export default function FormPage<FormValuesT>( { 
    children, 
    autoSave, 
    initialValues,
    onSubmit = () => {}
}: PropsWithChildren<FormPageProps<FormValuesT>>) {
    return (
        <Page>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form>
                    {/* Component to enable auto-save */}
                    { autoSave ? null : null }{/* #TODO: add AutoSave component*/}
                    {/* Font size */}
                    { children }
                </Form>
            </Formik>

        </Page>
    )
}