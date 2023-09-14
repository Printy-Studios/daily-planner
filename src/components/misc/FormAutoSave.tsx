//Core
import { useEffect } from 'react'
import { useFormikContext } from 'formik'


/**
 * Basic function for enabling autosave in a Formik form. #TODO Should probably be
 * extracted to a separate file
 * 
 * @returns {null}
 */
export default function FormAutoSave() {

    //Get formik context
    const formik = useFormikContext()

    //Submit form when a form value changes
    useEffect(() => {
        formik.submitForm()
    }, [formik.values])

    //Doesn't render anything
    return null
}