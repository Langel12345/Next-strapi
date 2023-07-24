import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { InitalValues, validationSchema } from './LoginForm.form';
import { useRouter} from "next/router"
import { Auth } from "@/api";
import { useAuth } from '@/hooks';
export  function LoginForm() {
    const authCotrl= new Auth();
    const router=  useRouter();
    const {login} = useAuth();
    const formik = useFormik({
        initialValues: InitalValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit:async(formValue) =>{
            try {
               const response= await authCotrl.login(formValue);
               console.log(response)
               login(response.jwt)
               //router.push('/');
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="identifier" 
                type="text" 
                placeholder="Correo o nombre de usuario"
                value={formik.values.identifier}
                onChange={formik.handleChange}
                error={formik.errors.identifier}
                >
            </Form.Input>
            <Form.Input 
                name="password" 
                type="password" 
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
                >
            </Form.Input>
            <Form.Button loading={formik.isSubmitting} type="submit" fluid>Entrar</Form.Button>
        </Form>
    )
}
