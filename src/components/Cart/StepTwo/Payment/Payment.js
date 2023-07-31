import styles from './Payment.module.scss'
import {CardElement } from '@stripe/react-stripe-js'
export  function Payment() {
  const cardStyles={
    style:{
        base:{
          color:"#FFF",
          fontSize:"16px",
          "::placeholder":{
            color:"#909090"
          }
        }
    }
  }
  return (
    <div className={styles.payment}>
        <h2>Metodos de Pago</h2>
        <div className={styles.block}>
            <CardElement options={cardStyles}  />
        </div>
    </div>
  )
}
