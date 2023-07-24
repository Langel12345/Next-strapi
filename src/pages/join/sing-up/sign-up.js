import  Link from 'next/link'
import styles from './sing-up.module.scss'
import { JoinLayout } from '@/layouts'
import { RegisterForm } from '@/components/Auth'
export default function SingUpPage() {
  return (
    <>
     <JoinLayout>
        <div className={styles.singUp}>
            <h3>Crear Cuenta</h3> 
            <RegisterForm />
            <div className={styles.actions}>
              <Link href='/join/sing-in'>Atras</Link>  
            </div>   
        </div>
    </JoinLayout> 
    </>
  )
}
