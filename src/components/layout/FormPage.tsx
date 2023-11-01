//Core
import { PropsWithChildren } from 'react'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

//Components
import Page, { PageProps } from './Page'
import FormAutoSave from 'components/misc/FormAutoSave'
import BackButton from 'components/buttons/BackButton'

type FormPageProps<FormValuesT extends FormikValues> = PageProps & {
    id: string
    autoSave?: boolean
    initialValues: FormValuesT
    validationSchema?: Yup.ObjectSchema<FormValuesT>
    onSubmit: (values: FormValuesT) => void
}

export default function FormPage<FormValuesT extends FormikValues>( { 
    id,
    children, 
    autoSave = false, 
    initialValues,
    validationSchema = undefined,
    pageState,
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
            pageState={pageState}
        >
            <Formik
                validationSchema={validationSchema}
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