import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { MyTextInput } from '../components/MyTextInput';

import '../styles/styles.css';

export const RegisterFormikPage = () => {
    return (
        <div>
            <h1>Register Formik Page</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password1: '',
                    password2: ''
                }}
                onSubmit={(values) => console.log(values)}
                validationSchema={
                    Yup.object({
                        name: Yup.string()
                                    .min(2, 'El nombre debe de ser de 3 caracteres o mas')
                                    .max(15, 'El nombre debe de ser menor de 15 caracteres')
                                    .required('Requerido'),
                        email: Yup.string()
                                    .email('Revise el formato del correo')
                                    .required('Requerido'),
                        password1: Yup.string()
                                    .min(6, 'Mínimo 6 letras')
                                    .required('Requerido'),
                        password2: Yup.string()
                                    .oneOf([Yup.ref('password1')], 'Las contraseñas no son iguales')
                                    .required('Requerido')
                    })
                }
            >
                {
                    ({ handleReset }) => (
                        <Form>
                            <MyTextInput
                                name='name'
                                label='Nombre'
                                placeholder='Fernando'
                            />
                            <MyTextInput
                                type='email'
                                name='email'
                                label='Email'
                                placeholder='john@google.com'
                            />
                            <MyTextInput
                                type='password'
                                name='password1'
                                label='Password'
                            />
                            <MyTextInput
                                type='password'
                                name='password2'
                                label='Confirm Password'
                            />
                            <button type="submit">Create</button>
                            <button type="button" onClick={handleReset}>Reset Form</button>
                        </Form>
                    )
                }

            </Formik>


        </div>
    )
}
