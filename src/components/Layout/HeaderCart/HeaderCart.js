import {Icon, Image} from 'semantic-ui-react'
import Link from 'next/link'
import { map} from 'lodash'
import styles from './HeaderCart.module.scss'
import { useRouter } from 'next/router'
import classNames from 'classnames'

export  function HeaderCart() {
  const {query:{step=1}} = useRouter();
  const currentStep = step;
  const steps=[
    {number:1 , title:"Cesta"},
    {number:2,title:'Pago'},
    {number:3 , title: "Confirmación"}
  ]
  return (
    <div className={styles.headerCartt}>
      <div className={styles.left}>
        <Link href={'/'}>
          <Image src="/images/logo.png" alt="Gaming" />
        </Link>
      </div>
      <div className={styles.center}>
        { map(steps, (step) =>(
          <div key={step.number} className={classNames({
            [styles.active]: step.number === Number(currentStep),
            [styles.success] : step.number < Number(currentStep)
          })}>
              <span className={styles.number}>
                <Icon name="check" />
                {step.number}
              </span>
              <span>{step.title}</span>
              <span className={styles.space}/>
          </div>
        ))}
      </div>
      <div className={styles.right}>
          <Icon name="lock" />
          <div>
            <span>Pago seguro</span>
            <span>256-bit SSL Secure</span>
          </div>
      </div>
    </div>
  )
}
