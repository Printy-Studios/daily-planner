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

    //Hooks
    const { createTask, getTaskById, updateTask, deleteTask } = useTasks()

    //Accepted params: id and group_id
    const { state } = useLocation()

    const navigate = useNavigate()
    
    //Initial values of form
    const initialValues: FormValues = useMemo(() => {
        
        //If ID param found(meaning that the page is in edit mode),
        //set initial values to the task with the given ID
        if (state?.id != null && state?.id !== undefined) {
            const task: Task = getTaskById(state.id)

            return {
                name: task.name,
                description: task.description,
                type: task.type
            }
        }
        //Otherwise (if the page is in 'new' mode), set default form values
        //#TODO: Add default values to defaults.ts and use those here
        return {
            name: '',
            description: '',
            type: 'TASK'
        }
    }, [])

    //Handle submit of form
    const handleSubmit = (values: FormValues) => {

        //If ID param found(meaning existing task is being modified), run update
        //function on respective task with the new values
        if (state && state.id !== undefined && state.id !== null) {
            console.log('updating task')
            updateTask({
                id: state.id,
                name: values.name,
                description: values.description,
                type: TaskType[values.type]
            })
        } else { //Otherwise create new task with provided form values
            createTask({
                name: values.name,
                description: values.description,
                group_id: state.group_id,
                type: TaskType[values.type]
            })
        }
        //Finally, navigate back to Schedule page
        navigate('/')
    }

    //Handle 'delete' button click
    const handleDeleteButtonClick = () => {
        //Delete task that is currently being edited
        //#TODO maybe add a check for presence of ID param to avoid bugs
        deleteTask(state.id)
        //After deleting task, navigate back to Schedule page
        navigate('/')
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
                    {/* Task name field */}
                    <TextInput
                        label='Name'
                        name='name'
                    />
                    {/* Task type field */}
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
                    {/* Task description field */}
                    <TextArea
                        label='Description'
                        name='description'
                        rows={6}
                    />
                </Form>
            </Formik>
            {/* If in 'edit' mode, render 'delete' button */}
            {state?.id !== null ? 
                <DeleteButton 
                    className='mt-auto'
                    onClick={handleDeleteButtonClick}
                />
            : null }
        </Page>
    )
}