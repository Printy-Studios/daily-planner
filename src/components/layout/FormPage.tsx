//Core
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

//Components
import Page, { PageProps } from './Page'
import FormAutoSave from 'components/misc/FormAutoSave'
import BackButton from 'components/buttons/BackButton'
import Button from 'components/buttons/Button'

type FormPageProps<FormValuesT extends FormikValues> = PageProps & {
    id: string
    autoSave?: boolean
    initialValues: FormValuesT
    validationSchema?: Yup.ObjectSchema<FormValuesT>
    headerColor?: string
    onFormUpdate?: (formikProps: FormikProps<FormValuesT>) => void
    onSubmit: (values: FormValuesT) => void
}

export default function FormPage<FormValuesT extends FormikValues>( { 
    id,
    children, 
    autoSave = false, 
    initialValues,
    validationSchema = undefined,
    pageState,
    headerColor,
    onFormUpdate = () => {},
    onSubmit = () => {}
}: PropsWithChildren<FormPageProps<FormValuesT>>) {

    const onSubmitWrapper = useCallback((values: FormValuesT, actions: FormikHelpers<FormValuesT>) => {
        onSubmit(values)
        actions.setSubmitting(false);
    }, [])

    const [isModified, setIsModified] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    return (
        <Page
            headerLeft={
                <BackButton />
            }
            headerRight={
                isSaving ? 
                'Saving...' :
                autoSave ? null :
                <Button 
                    form={id} 
                    type='submit' 
                    variant='primary'
                    className={`${!isModified || !isValid ? 'button-disabled' : ''}`}
                >
                    Save
                </Button>
                // <button form={id} type='submit'>Save</button>
            }
            headerColor={headerColor}
            pageState={pageState}
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmitWrapper}
            >
                { props => {
                    //Get whether form has been modified to disable/enable save button
                    setIsModified(props.dirty)
                    setIsValid(props.isValid)
                    setIsSaving(props.isSubmitting)
                    onFormUpdate(props);
                    return (
                        <Form
                            id={id}
                        >
                            {/* Component to enable auto-save */}
                            { autoSave ? <FormAutoSave /> : null }{/* #TODO: add AutoSave component*/}
                            {/* Fields here */}
                            { children }
                        </Form>
                    )
                }}
                
            </Formik>

        </Page>
    )
}