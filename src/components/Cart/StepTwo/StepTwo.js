import { Separator } from '@/components/Shared';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import styles from './StepTwo.module.scss'
import {Addresses} from './Addresses'
import { useState } from 'react';
import { Payment } from './Payment';
import { ENV } from '@/utils';
import { Resumen } from './Resumen';

const stripeInit = loadStripe(ENV.STRIPE_TOKEN);

export  function StepTwo(props) {
    const { games} = props;
    const [addressSelected, setAddressSelected] = useState(null);
    return (
        <Elements stripe={stripeInit}>
            <div className={styles.steptwo}>
                <div className={styles.center}>
                    <Addresses addressSelected={addressSelected} setAddressSelected={setAddressSelected}/>
                    <Separator height={50} />
                    {addressSelected && <Payment /> }
                
                </div>
                <div className={styles.right}>
                    <Resumen games={games} addressSelected={addressSelected}/>
                </div>
            </div>
        </Elements>
    )
}
