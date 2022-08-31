import * as Yup from 'yup';
import { useCallback } from 'react';
import { Formik, Form } from 'formik';
import formJson from '../data/custom-form.json';
import { MySelect, MyTextInput } from '../components';

const initialValues: { [key: string]: any } = {};
const validations: { [key: string]: any } = {};
formJson.forEach((input) => {
    initialValues[input.name] = input.value;
    
    if (!input.validations) return;

    let schema = Yup.string();
    input.validations.forEach((rule: any) => {
        switch(rule.type) {
            case 'required': schema = schema.required('Requerido'); break;
            case 'email': schema = schema.email('Revise el formato del email'); break;
            case 'minLength': schema = schema.min(rule.value || 2, `Mínimo de ${ rule.value || 2 } caracteres`); break;
        }
    });

    validations[input.name] = schema;
});

const validationSchema = Yup.object({ ...validations });

export const DynamicFormPage = () => {
    // const [formJson, setFormJson] = useState();
    // useEffect(() => {
    //     const myFetch = async () => {
    //         const response = await fetch('data/custom-form.json', { method: 'GET' });
    //         if (response.ok) setFormJson(await response.json());
    //     }
    //     myFetch();
    // }, []);

    const buildTextBox = useCallback(({name, type, label, placeholder}: any) => (
        <MyTextInput
            key={name}
            type={(type as any)}
            name={name}
            label={label}
            placeholder={placeholder}
        />
    ), []);

    const buildSelect = useCallback(({name, label, options}: any) => (
        <MySelect
            key={ name }
            label={ label }
            name={ name } 
        >
            <option value=''>Select an option</option>
            { options?.map(({id, label}: any) => <option key={ id } value={ id }>{ label }</option>) }
        </MySelect>
    ), []);

    const buildControls = useCallback(() =>
        formJson.map((control) => {
            switch(control.type){
                case 'input':
                case 'password': 
                case 'email':
                    return buildTextBox(control);
                case 'select':
                    return buildSelect(control);
                default: return <span>Type: {control.type} no soportado</span>;
            }
        }), [buildSelect, buildTextBox]
    );

    return (
        <div>
            <h1>Dynamic Form Page</h1>
            <Formik
                initialValues={ initialValues }
                validationSchema={ validationSchema }
                onSubmit={(values) => console.log(values)}
            >
                {
                    (formik)=>(
                        <Form noValidate>
                            { buildControls() }
                            <button type="submit">Submit</button>
                        </Form>

                    )
                }
            </Formik>
        </div>
    )
}
