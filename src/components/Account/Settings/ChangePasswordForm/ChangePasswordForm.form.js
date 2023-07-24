import * as Yup from 'yup';

export function initalValues(){
    return{
        password:'',
        confirmPassword:''
    }
}

export function validationSchema(){
    return Yup.object({
        password: Yup.string().required(true),
        confirmPassword: Yup.string().required().oneOf([Yup.ref("password")],"Las contraseñas no coinciden")
    })
}