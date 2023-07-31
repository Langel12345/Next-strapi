import Link from 'next/link';
import styles from './Resumen.module.scss'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import { forEach } from 'lodash';
import { fn } from '@/utils';
export  function Resumen(props) {
    const {games} =props;
    const router = useRouter();
    const [totals, setTotals] = useState(null);
    console.log(totals)
    useEffect(() => {
        let totales={
            original:0,
            discount:0,
            price:0
        };
        forEach( games, (game) =>{
            const price = fn.calcDiscountedPrice(
                game.attributes.price,
                game.attributes.discount
            );
            totales={
                original: totales.original + game.attributes.price * game.quantity,
                discount: totales.discount + (game.attributes.price - price) * game.quantity,
                price: totales.price + price * game.quantity
            }
        });
        setTotals(totales);
       
    }, [games])
    const goToStepTwo=() =>{
        router.replace({ query: {...router.query, step: 2}});
    }   
    if(!totals) return null;
    return (
        <div className={styles.resumen}>
            <h2>Resumen</h2>
            <div className={styles.block}>
                <div className={styles.prices}>
                    <div>
                        <span>Precio Oficial:</span>
                        <span>$ {totals.original.toFixed(2) }</span>
                    </div>
                    <div>
                        <span>Descuento:</span>
                        <span>$ {totals.discount.toFixed(2) }</span>
                    </div>

                    <div>
                        <span>Subtotal:</span>
                        <span>$ {totals.price.toFixed(2) }</span>
                    </div>

                </div>
                <Button primary fluid onClick={goToStepTwo}>
                    Proceder con el pago
                </Button>
                <Link href="/">Continuar comprando</Link>
            </div>
        </div>
    )
}
