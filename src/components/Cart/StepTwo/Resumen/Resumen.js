import { useEffect, useState } from 'react';
import styles  from './Resumen.module.scss'
import { Button } from 'semantic-ui-react';
import { forEach, map } from 'lodash';
import { useAuth, useCart } from '@/hooks';
import { Cart } from '@/api';
import {CardElement, useStripe,useElements} from '@stripe/react-stripe-js';
import { fn } from '@/utils';
import { useRouter } from 'next/router';
const cartCtrl = new Cart();
export  function Resumen(props) {
    const {games, addressSelected}= props;
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user }= useAuth();
    const {deteleAllItems} = useCart();
    const router = useRouter();
    useEffect(() => {
        let totalTemp =0;
        forEach(games, (game) =>{
            const price =fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount);
            totalTemp  += price * game.quantity;
        }) ;
        setTotal(totalTemp.toFixed(2));
    }, [games]);
    const onPage =async () =>{
        setLoading(true);
        if(!stripe || !elements){
            setLoading(false);
            return;
        }
        const cardElements = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElements);
        console.log(result)
        if(result.error){
            console.error(result.error.message);
        }else{
            const response = await cartCtrl.createOrder( games, user.id, addressSelected);
            if(response.status === 200){
                setLoading(false);
                deteleAllItems();
                goToSetpEnd();
            }else{
                console.log("error al realizar el pedido")
            }
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    const goToSetpEnd =() =>{
        router.replace({query: {...router.query, step:3}})
    }
    if(!total) return null;
    return (
        <div className={styles.resumen}>
            <h2>Resumen</h2>
            <div className={styles.block}>
                <div className={styles.products}>
                    {
                        map(games, (game) =>(
                            <div key={game.id} className={styles.product}>
                                <div>
                                    <p>{game.attributes.title}</p>
                                    <span>{game.attributes.plataform.data.attributes.title}</span>
                                </div>
                                <span>
                                    {game.quantity > 0 && `${game.quantity}x`}
                                    ${fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.blockTotal}>
                <div>
                    <span>Total: </span>
                    <span>${total} </span>
                </div>
                <Button 
                    primary 
                    disabled={!addressSelected}
                    onClick={onPage}
                    loading={loading}
                >
                    Pagar
                </Button>
            </div>
        </div>
    )
}
