import {Form} from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Auth } from '@/api';
import { useRouter } from 'next/router'
import { initalValues, validationSchema} from './RegisterForm.form'
export  function RegisterForm() {
    const authCtrl = new Auth();
    const router = useRouter();
    const formik =useFormik({
        initialValues: initalValues(),
        validationSchema:validationSchema(),
        validateOnChange: false,
        onSubmit:async (formValues) =>{
            try {
                await authCtrl.register(formValues);
                router.push('/join/sing-in')
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input 
                    value={formik.values.email} 
                    name="email" 
                    type="email" 
                    placeholder="Correo Electronico"
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                >    
                </Form.Input>
                <Form.Input 
                    value={formik.values.username} 
                    name="username" 
                    type="text" 
                    placeholder="Nombre de Usuario"
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                >  
                </Form.Input>
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input  
                    value={formik.values.firstname} 
                    name="firstname" 
                    type="text" 
                    placeholder="Nombres"
                    onChange={formik.handleChange}
                    error={formik.errors.firstname}
                    >
                </Form.Input>
                <Form.Input  
                    value={formik.values.lastname} 
                    name="lastname" 
                    type="text" 
                    placeholder="Apellidos"
                    onChange={formik.handleChange}
                    error={formik.errors.lastname}
                    >
                </Form.Input>
                
            </Form.Group>
            <Form.Group>
                <Form.Input  
                    value={formik.values.password}  
                    name="password" 
                    type="password" 
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    >    
                </Form.Input>
            </Form.Group>
            <Form.Button type="submit" fluid loading={formik.isSubmitting}> 
                Registrarse
            </Form.Button>
        </Form>
    )
}
