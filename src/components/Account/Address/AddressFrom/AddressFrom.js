import { useFormik } from "formik"
import { Form } from "semantic-ui-react"
import { initalValues, validationSchema } from './AddressFrom.from';
import { Address } from '@/api';
import { useAuth } from '@/hooks';


export  function AddressFrom(props) {
    const addressCtrl = new Address();
    const { onClose,onReload,addressId,address }= props;
    const {user }= useAuth();
    const formik = useFormik({
        initialValues: initalValues(address),
        validationSchema: validationSchema(),
        validateOnChange:false,
        onSubmit: async (formData)=>{
            try {
                if(addressId){
                    await addressCtrl.update(formData,addressId);
                }else{
                    await addressCtrl.create(formData,user.id).then(console.log).catch(console.log);
                }
                formik.handleReset();
                onReload();
                onClose(); 
                
            } catch (error) {
                throw error
            }
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="title" 
                placeholder="Titulo de la dirección" 
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />
            <Form.Group widths="equal">
                <Form.Input 
                name="name" 
                placeholder="Nombre y apellidos" 
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
            />
            <Form.Input 
                name="address" 
                placeholder="Dirección" 
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.errors.address}
            />  
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Input 
                name="state" 
                placeholder="Estado" 
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.errors.state}
            />
            <Form.Input 
                name="city" 
                placeholder="Ciudad"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.errors.city} 
            />  
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Input 
                name="postal_code" 
                placeholder="Codio Postal" 
                value={formik.values.postal_code}
                onChange={formik.handleChange}
                error={formik.errors.postal_code}
            />
            <Form.Input 
                name="phone" 
                placeholder="Telefono" 
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone}
            />  
            </Form.Group>
            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Enviar
            </Form.Button>
        </Form>
    )
}
