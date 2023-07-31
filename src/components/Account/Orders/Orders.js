import { useEffect, useState } from "react"
import {Order as OrderApi} from '@/api'
import { NoResult } from "@/components/Shared";
import{useAuth} from '@/hooks'
import {Order} from './Order'
import { map } from "lodash";
const orderCtrl = new OrderApi();
export  function Orders() {
    const [Orders, setOrders] = useState(null);
    const {user} = useAuth();
    useEffect(() => {
        (async () =>{
            try {
                const response = await orderCtrl.getAll(user.id);
                setOrders(response.data);
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])
    
    if(!Orders) return <NoResult text="No tienes ningun producto comprado" />
  return (
    <div>
        {map(Orders, (order) =>(
            <Order key={order.id} order={order} />
        ))}
    </div>
  )
}
