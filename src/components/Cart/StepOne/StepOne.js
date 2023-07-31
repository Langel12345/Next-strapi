import styles from './StepOne.module.scss'
import {Basket} from './Basket'
import { Resumen } from './Resumen';
export  function StepOne(props) {
    const{ games } = props;
    return (
        <div className={styles.stepone}>
            <div className={styles.center}>
                <Basket games={games} />
            </div>
            <div className={styles.right}>
                <Resumen games={games} />
            </div>
        </div>
    )
}
