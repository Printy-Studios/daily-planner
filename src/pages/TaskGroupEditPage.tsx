import { useContext, useMemo } from 'react'
import { Formik, FormikHelpers, Form } from 'formik'
import TextInput from 'components/forms/TextInput'
import Page from 'components/layout/Page'
import TimeInput from 'components/forms/TimeInput'
import { TaskGroupDispatchContext } from 'state/TaskGroupContext'
import { TaskGroupDispatch } from 'state/taskGroupReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import Time from 'types/Time'
import BackButton from 'components/buttons/BackButton'
import DeleteButton from 'components/buttons/DeleteButton'
import useTaskGroups from 'functions/useTaskGroups'
import TaskGroup from 'types/TaskGroup'

type FormValues = {
    name: string
    time: string
}

const FormSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    time: Yup.string().required().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
})

function strToTime( str: string ): Time {
    const arr = str.split(':');
    return {
        hrs: parseInt(arr[0]),
        mins: parseInt(arr[1])
    }
}

function padTime( n: number ): string {
    return n.toString().padStart(2, '0');
}

function timeToStr(time: Time): string {
    return `${padTime(time.hrs)}:${padTime(time.mins)}`
}

export default function TaskGroupEditPage() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { getTaskGroupById } = useTaskGroups();
    
    

    const dispatchTaskGroups: TaskGroupDispatch = useContext(TaskGroupDispatchContext)

    const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        console.log('submitted form')
        console.log(values)
        //console.log('state id: ', state.id)
        if (state && state.id) {
            dispatchTaskGroups({
                type: 'update',
                data: {
                    id: state.id,
                    name: values.name,
                    time: strToTime(values.time)
                }
            })
        }
        else {
            dispatchTaskGroups({
                type: 'create',
                data: {
                    name: values.name,
                    time: strToTime(values.time)
                }
            })
        }

        
        
        navigate('/');
    }

    const handleDeleteButtonClick = () => {
        dispatchTaskGroups({
            type: 'delete',
            data: {
                id: state.id
            }
        })
        navigate('/')
    }

    const initialValues: FormValues = useMemo(() => {
        
        if (state?.id != null && state?.id !== undefined) {
            const task_group: TaskGroup = getTaskGroupById(state.id)

            return {
                name: task_group.name,
                time: timeToStr(task_group.time)
            }
        }

        return {
            name: '',
            time: ''
        }
    }, [])

    return (
        <Page
            headerLeft={(
                <BackButton />
            )}
            headerRight={(
                <button form='task-group-edit' type='submit'>Save</button>
            )}
        >
            <Formik
                validationSchema={FormSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form
                    id='task-group-edit'
                    className='flex flex-col gap-m'
                >
                    <TextInput
                        label='Group name'
                        name='name'
                    />
                    <TimeInput
                        label='Time'
                        name='time'
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