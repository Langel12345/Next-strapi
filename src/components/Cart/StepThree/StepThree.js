import Link from 'next/link'
import styles from './StepThree.module.scss'
import { Button, Icon} from 'semantic-ui-react'
export  function StepThree() {
  return (
    <div className={styles.stepthree}>
        <Icon name="check circle outline" />
        <h2>¡Compra exitosa!</h2>
        <Button  as={Link} href="/account" primary >
            Ver pedido
        </Button>
    </div>
  )
}
