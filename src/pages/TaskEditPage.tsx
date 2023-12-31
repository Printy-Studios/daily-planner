//Core
import { useMemo } from 'react'
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

//Components
import TextInput from 'components/input/TextInput'
import TextArea from 'components/input/TextArea'
import DeleteButton from 'components/buttons/DeleteButton';
import Select from 'components/input/Select';
import FormPage from 'components/layout/FormPage';

//Functions
import useTasks from 'functions/useTasks';

//Types
import { Task, TaskType } from 'types/Task';
import usePage from 'functions/usePage';
import useTaskGroups from 'functions/useTaskGroups';

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
    const taskGroups = useTaskGroups();
    const { pageState } = usePage();

    //Accepted params: id and group_id
    const { state } = useLocation()

    const navigate = useNavigate()

    //const initial_task = useMemo(() => getTaskById(state.id), [])

    const headerColor = useMemo(() => taskGroups.getTaskGroupById(state.group_id)?.color, []);

    console.log(headerColor)
    
    //Initial values of form
    const initialValues: FormValues = useMemo(() => {
        
        //If ID param found(meaning that the page is in edit mode),
        //set initial values to the task with the given ID
        if (state?.id != null && state?.id !== undefined) {
            const task: Task = getTaskById(state.id)!

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
                type: TaskType[values.type],
                completed: false
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
        <FormPage
            id='task-edit-form'
            validationSchema={FormSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            pageState={pageState}
            headerColor={headerColor}
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
            {/* If in 'edit' mode, render 'delete' button */}
            {state?.id !== null ? 
                <DeleteButton 
                    className='mt-auto'
                    onClick={handleDeleteButtonClick}
                />
            : null }
        </FormPage>
    )
}