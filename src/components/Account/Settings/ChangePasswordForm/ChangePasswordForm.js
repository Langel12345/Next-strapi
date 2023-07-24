import { useFormik } from 'formik'
import styles from './ChangePasswordForm.module.scss'
import { Form } from 'semantic-ui-react'
import { User } from '@/api';
import { useAuth } from '@/hooks';
import { initalValues, validationSchema} from './ChangePasswordForm.form'
export  function ChangePasswordForm() {
    const userCtrl = new User();
    const {user ,logout} = useAuth()
    const formik = useFormik({
        initialValues: initalValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit : async(formData) =>{

            try {
                await userCtrl.updateMe(user.id, { password: formData.password});
                formik.handleReset();
                logout();
            } catch (error) {
                throw error
            }
        }    
    })
    return (
        <Form className ={styles.form} onSubmit={formik.handleSubmit}>
            <label>Cambiar contraseña</label>
            <Form.Input 
                type="password" 
                name="password" 
                placeholder="Nueva contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={ formik.errors.password}
            />
            <Form.Input 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirmar contraseña"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={ formik.errors.confirmPassword}
            />

            <Form.Button type="submit" loading={formik.isSubmitting} >Enviar</Form.Button>
        </Form>
    )
}
