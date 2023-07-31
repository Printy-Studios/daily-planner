//Core
import { useMemo } from 'react'
import * as Yup from 'yup';
import { Form, Formik } from 'formik'

//Components
import TextInput from 'components/forms/TextInput'
import Page from 'components/layout/Page'
import TextArea from 'components/forms/TextArea'
import BackButton from 'components/buttons/BackButton'
import { useLocation } from 'react-router-dom'
import DeleteButton from 'components/buttons/DeleteButton';
import Select from 'components/forms/Select';

type FormValues = {
    name: string
    description?: string
}

const FormSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    name: Yup.string().required('Name is required').max(64, 'Maximum 64 characters'),
    description: Yup.string().max(256, 'Maximum 256 characters')
})

export default function TaskEditPage() {

    const { state } = useLocation()
    
    const initialValues: FormValues = useMemo(() => {
        
        // if (state?.group_id != null && state?.group_id !== undefined) {
        //     //const task_group: TaskGroup = getTaskGroupById(state.id)

        //     return {
        //         name: task_group.name,
        //         time: timeToStr(task_group.time)
        //     }
        // }

        return {
            name: '',
            description: ''
        }
    }, [])

    const handleSubmit = (values: FormValues) => {
        // if()
    }

    const handleDeleteButtonClick = () => {
        
    }

    return (
        <Page
            headerLeft={
                <BackButton />
            }

            headerRight={
                <button form='task-edit' type='submit'>Save</button>
            }
        >
            <Formik
                validationSchema={FormSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form
                    id='task-edit'
                    className='flex flex-col gap-m'
                >
                    <TextInput
                        label='Name'
                        name='name'
                    />
                    <Select
                        label='Type'
                        name='type'
                        options={[
                            {
                                label: 'Task',
                                value: 'task'
                            },
                            {
                                label: 'Note',
                                value: 'note'
                            }
                        ]}
                    />
                    <TextArea
                        label='Description'
                        name='description'
                        rows={6}
                    />
                </Form>
            </Formik>
            {state?.id ? 
                <DeleteButton 
                    className='mt-auto'
                    onClick={handleDeleteButtonClick}
                />
            : null }
        </Page>
    )
}