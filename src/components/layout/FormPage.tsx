//Core
import { PropsWithChildren } from 'react'
import { Formik, Form, FormikValues } from 'formik'

//Components
import Page from './Page'
import FormAutoSave from 'components/misc/FormAutoSave'
import BackButton from 'components/buttons/BackButton'

type FormPageProps<FormValuesT extends FormikValues> = {
    id: string
    autoSave?: boolean
    initialValues: FormValuesT
    onSubmit: (values: FormValuesT) => void
}

export default function FormPage<FormValuesT extends FormikValues>( { 
    id,
    children, 
    autoSave = false, 
    initialValues,
    onSubmit = () => {}
}: PropsWithChildren<FormPageProps<FormValuesT>>) {
    return (
        <Page
            headerLeft={
                <BackButton />
            }
            headerRight={
                autoSave ? null :
                <button form={id} type='submit'>Save</button>
            }
        >
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form
                    id={id}
                >
                    {/* Component to enable auto-save */}
                    { autoSave ? <FormAutoSave /> : null }{/* #TODO: add AutoSave component*/}
                    {/* Fields here */}
                    { children }
                </Form>
            </Formik>

        </Page>
    )
}