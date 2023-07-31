import {CartLayout} from '@/layouts';
import { useRouter} from 'next/router';
import { useState,useEffect } from 'react';
import {useCart} from '@/hooks'
import { Game } from '@/api';
import {Cart} from '@/components/Cart'
const gameCtrl = new Game();
export default function CartPage() {
  const {cart} = useCart();
  const [games, setGames] = useState(null);
  const {query:{step=1}} = useRouter();
  const currentStep =Number(step);
  useEffect(() => {
    ( async () =>{
      try {
          const data =[];
          for await(const item of  cart){
              const response = await  gameCtrl.getGameByID(item.id);
              data.push({...response.data, quantity: item.quantity});
          }
          setGames(data)
      } catch (error) {
        console.log(error);
      }
    })()
  }, [cart])
  
  return (
    <>
        <CartLayout>
          { currentStep === 1 && <Cart.StepOne games={games} />}
          { currentStep === 2 && <Cart.StepTwo games={games}/> }
          { currentStep === 3 && <Cart.StepThree /> }
        </CartLayout>
    </>
  )
}
