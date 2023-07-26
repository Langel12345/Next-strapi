import styles from './Account.module.scss';
import {Button,Icon,Label} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useAuth,useCart } from '@/hooks'
import classNames from 'classnames'
export  function Account() {
    const { user } = useAuth();
    const {total} = useCart();
    const router =  useRouter();
    const goToLogin=() => router.push('/join/sing-in');
    const goToAccount = () => router.push("/account");
    const goToCard = () =>{
        if(!user) goToLogin()
        else router.push("/cart")
    }
    return (
        <div className={styles.account}>
            <Button icon className={styles.cart}>
                <Icon name="cart" onClick={goToCard} />
                {total > 0 && <Label circular>{total}</Label>}
            </Button>
            <Button icon className={classNames({[styles.user]: user})}>
                <Icon name='user outline' onClick={user ? goToAccount : goToLogin }/>
            </Button>
        </div>
    )
}
