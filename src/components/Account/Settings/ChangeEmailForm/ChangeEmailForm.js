import styes from './ChangeEmailForm.module.scss';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { User } from '@/api';
import { useAuth } from '@/hooks';
import  { initialValues, validateSchema } from './ChangeEmailForm.form'
export  function ChangeEmailForm() {
    const userCtrl = new User();
    const {user, updateUser} = useAuth()
    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:validateSchema(),
        validateOnChange:false,
        onSubmit: async (formData)=>{

            try {
                await userCtrl.updateMe(user.id, { email: formData.email});
                updateUser("email",formData.email)
                formik.handleReset();
            } catch (error) {
                console.log(error)
            }
        }
    });

  return (
    <Form className={styes.form} onSubmit={formik.handleSubmit}>
        <label>Cambiar correo electronico</label>
        <Form.Input 
            name="email" 
            placeholder="Nuevo correo electronico" 
            value={formik.values.email} 
            onChange={formik.handleChange}
            error={formik.errors.email}
        />
        <Form.Input 
            name="confirmEmail" 
            placeholder="Confirmar correo electronico"
            value={formik.values.confirmEmail} 
            onChange={formik.handleChange}
            error={formik.errors.confirmEmail}
        />
        <Form.Button type="submit" loading={formik.isSubmitting}>Enviar</Form.Button>
    </Form>
  )
}
