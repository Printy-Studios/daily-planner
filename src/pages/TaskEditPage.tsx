//Core
import { useMemo } from 'react'
import * as Yup from 'yup';
import { Form, Formik } from 'formik'

//Components
import TextInput from 'components/forms/TextInput'
import Page from 'components/layout/Page'
import TextArea from 'components/forms/TextArea'
import BackButton from 'components/buttons/BackButton'
import { useLocation, useNavigate } from 'react-router-dom'
import DeleteButton from 'components/buttons/DeleteButton';
import Select from 'components/forms/Select';
import useTasks from 'functions/useTasks';
import { Task, TaskType } from 'types/Task';

type FormValues = {
    name: string
    description?: string
    type: 'NOTE' | 'TASK'
}

const FormSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    name: Yup.string().required('Name is required').max(64, 'Maximum 64 characters'),
    description: Yup.string().max(256, 'Maximum 256 characters'),
    type: Yup.string().required().oneOf(Object.values(TaskType))
})

export default function TaskEditPage() {

    const { createTask, getTaskById, updateTask } = useTasks()
    const { state } = useLocation()
    const navigate = useNavigate()
    
    const initialValues: FormValues = useMemo(() => {
        
        if (state?.id != null && state?.id !== undefined) {
            const task: Task = getTaskById(state.id)

            return {
                name: task.name,
                description: task.description,
                type: task.type
            }
        }

        return {
            name: '',
            description: '',
            type: 'TASK'
        }
    }, [])

    const handleSubmit = (values: FormValues) => {
        console.log(state)
        if (state && state.id !== undefined && state.id !== null) {
            console.log('updating task')
            updateTask({
                id: state.id,
                name: values.name,
                description: values.description,
                type: TaskType[values.type]
            })
        } else {
            createTask({
                name: values.name,
                description: values.description,
                group_id: state.group_id,
                type: TaskType[values.type]
            })
        }

        navigate('/')
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
                                value: TaskType.TASK
                            },
                            {
                                label: 'Note',
                                value: TaskType.NOTE
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