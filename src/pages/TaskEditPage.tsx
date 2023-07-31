//Core
import { useMemo } from 'react'

import TextInput from 'components/forms/TextInput'
import Page from 'components/layout/Page'
import { Form, Formik } from 'formik'
import TextArea from 'components/forms/TextArea'
//import { useLocation } from 'react-router-dom'

type FormValues = {
    name: string
    description: string
}

export default function TaskEditPage() {

    //const {state} = useLocation()
    
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

    }

    return (
        <Page>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form
                    id='task-group-edit'
                    className='flex flex-col gap-m'
                >
                    <TextInput
                        label='Title'
                        name='title'
                    />
                    <TextArea
                        label='Description'
                        name='description'
                        rows={6}
                    />
                </Form>
            </Formik>
        </Page>
    )
}