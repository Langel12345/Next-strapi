import { Form } from 'semantic-ui-react';
import {useFormik } from 'formik';
import { useAuth } from '@/hooks'
import { initalValues,validationSchema } from './ChangeNameForm.form';
import { User } from '@/api'
import styles  from './ChangeName.module.scss';
export  function ChangeNameForm() {
  const {user }=useAuth();
  const userCtrl = new User();
  const formik = useFormik({
    initialValues:initalValues(user.firstname, user.lastname),
    validationSchema: validationSchema(),
    validateOnChange:false,
    onSubmit: async(formValue) =>{
      try {
        await userCtrl.updateMe(user.id,formValue);
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
        <label> Nombre y apellidos </label>

        <div className ={ styles.content }>
          <Form.Input 
              name="firstname"  
              placeholder="Nombre" 
              value={ formik.values.firstname} 
              onChange={formik.handleChange} 
              error={ formik.errors.firstname}
          />
          <Form.Input 
              name="lastname"  
              placeholder="Apellidos" 
              value={ formik.values.lastname} 
              onChange={formik.handleChange} 
              error={ formik.errors.lastname}
          />
          <Form.Button type="submit" loading ={formik.isSubmitting}>Enviar</Form.Button>
        </div>
    </Form>
  )
}
