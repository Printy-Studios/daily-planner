//Core
import { useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik, FormikHelpers, Form } from 'formik'
import * as Yup from 'yup';

//Types
import Time from 'types/Time'
import TaskGroup from 'types/TaskGroup'

//State
import { TaskGroupDispatchContext } from 'state/TaskGroupContext'
import { TaskGroupDispatch } from 'state/taskGroupReducer'

//Components
import TextInput from 'components/input/TextInput'
import Page from 'components/layout/Page'
import TimeInput from 'components/input/TimeInput'
import BackButton from 'components/buttons/BackButton'
import DeleteButton from 'components/buttons/DeleteButton'
import ColorInput from 'components/input/ColorInput'

//Functions
import useTaskGroups from 'functions/useTaskGroups'

//Form values type
type FormValues = {
    name: string
    time: string
    color: string
}

//Validation schema for form
const FormSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    time: Yup.string().required().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    color: Yup.string().required()
})

/**
 * Converts string (such as '00:00') to a Time object
 * 
 * @param {string} str string to convert. Must follow format 'xx:xx' 
 * 
 * @returns {Time} Time object
 */
function strToTime( str: string ): Time {
    //#TODO add a regex check to make sure that string matches format

    //Split string into 2 parts, for hrs and for minutes
    const arr = str.split(':');

    //Return the 2 parts as Time object(converted to int)
    return {
        hrs: parseInt(arr[0]),
        mins: parseInt(arr[1])
    }
}

/**
 * Pad a number to be in a time format, for example 7 becomes '07' and 12 
 * becomes '12'
 * 
 * @param {number} n Number to convert 
 * 
 * @returns {string} Formatted string
 */
function padTime( n: number ): string {
    //#TODO: Maybe add a min max check to only allow time-valid numbers
    return n.toString().padStart(2, '0');
}

/**
 * Convert Time object into a string following format 'xx:xx'
 * 
 * @param {Time} time Time object to convert 
 * 
 * @returns {string} String representation of the time
 */
function timeToStr(time: Time): string {
    return `${padTime(time.hrs)}:${padTime(time.mins)}`
}

type RouteState = {
    id?: number,
    date: Date
}

/**
 * Task Group Edit Page
 */
export default function TaskGroupEditPage() {

    //Hooks
    const { state }: { state: RouteState } = useLocation();
    const navigate = useNavigate();
    const { getTaskGroupById } = useTaskGroups();

    const task_group = useMemo(() => {
        if (state?.id != null && state?.id !== undefined) {
            return getTaskGroupById(state.id)
        }
        return null
    }, [])
    
    //#TODO: Change dispatch to useTaskGroups()
    const dispatchTaskGroups: TaskGroupDispatch = useContext(TaskGroupDispatchContext)

    //Handle submit of form
    const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {

        const data = {
            name: values.name,
            time: strToTime(values.time),
            color: values.color,
            date: (task_group && task_group.date) || state.date
        }

        //console.log(data)

        //If ID param passed, update task group
        if (state && state.id) {
            console.log('updating group')
            dispatchTaskGroups({
                type: 'update',
                data: {
                    id: state.id,
                    ...data
                }
            })
        } else { //Otherwise create a new one
            console.log('creating new group')
            dispatchTaskGroups({
                type: 'create',
                data: {
                    ...data
                }
            })
        }
        //Finally, navigate back to the Schedule page
        navigate('/');
    }

    //Handle 'delete' button click
    const handleDeleteButtonClick = () => {
        //#TODO: Consider adding an ID check to make sure that task group exists
        dispatchTaskGroups({
            type: 'delete',
            data: {
                id: state.id!
            }
        })
        //After deleting task group, navigate back to the Schedule page
        navigate('/')
    }

    //Initial values of form
    const initialValues: FormValues = useMemo(() => {
        //If ID param passed, use values from the task group with such ID
        if (state?.id != null && state?.id !== undefined) {
            const task_group: TaskGroup = getTaskGroupById(state.id)

            return {
                name: task_group.name,
                time: timeToStr(task_group.time),
                color: task_group.color //#TODO: Replace with actual color
            }
        }

        //Otherwise use default values
        //#TODO: Add default values to defaults.ts and use those here
        return {
            name: '',
            time: '',
            color: '#000000'
        }
    /* eslint-disable */
    }, [getTaskGroupById])
    /*eslint-enable */

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
                    {/* Group name field */}
                    <TextInput
                        label='Group name'
                        name='name'
                    />
                    {/* Time field */}
                    <TimeInput
                        label='Time'
                        name='time'
                    />
                    <ColorInput
                        label='Color'
                        name='color'
                    />
                </Form>
            </Formik>
            {/* If existing group, render 'delete' button */}
            {state?.id ? 
                <DeleteButton 
                    className='mt-auto'
                    onClick={handleDeleteButtonClick}
                />
            : null }
        </Page>
    )
}