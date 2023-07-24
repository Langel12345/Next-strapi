import * as Yup from 'yup';

export function initialValues(){
    return {
        email:"",
        confirmEmail:""
    }
}
export function validateSchema(){
    return Yup.object({
        email: Yup.string().email(true).required(true),
        confirmEmail: Yup.string()
            .email(true)
            .required(true)
            .oneOf([Yup.ref("email")], "Los correos no coinciden")
    })
}