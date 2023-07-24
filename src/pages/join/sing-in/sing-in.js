import Link from 'next/link'
import styles from './sing-in.module.scss'
import {JoinLayout} from '@/layouts'
import { LoginForm} from "@/components/Auth"
export default function SingInPage() {
    return (
        <>
            <JoinLayout>
                <div className={styles.singIn}>
                    <h3>Iniciar sesión</h3>

                    <LoginForm />
                    <div className={styles.actions}>
                        <Link href="/join/sing-up">¿No tienes cuenta?</Link>
                    </div>
                </div>
                
            </JoinLayout>
        </>
        
    )
}
