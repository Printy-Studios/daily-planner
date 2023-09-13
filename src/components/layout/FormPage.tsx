//Core
import { PropsWithChildren } from 'react'
import { Formik, Form } from 'formik'

//Components
import Page from './Page'
import FormAutoSave from 'components/misc/FormAutoSave'

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
                    { autoSave ? <FormAutoSave /> : null }{/* #TODO: add AutoSave component*/}
                    {/* Fields here */}
                    { children }
                </Form>
            </Formik>

        </Page>
    )
}