import {useEffect,useState,createContext} from 'react';
import {Cart} from '@/api';
const cartCtrl = new Cart();
export const CartContext = createContext();
export function CartProvider(props){
    const {children} =props;
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(cartCtrl.count());

    useEffect(() => {
        const response =cartCtrl.getAll();
        setCart(response);
    }, [])
    const addCart =(gameId)=>{
        cartCtrl.add(gameId);
        refreshCart();
    }
    const refreshCart =() =>{
        setTotal(cartCtrl.count());
        setCart(cartCtrl.getAll());
    }
    const changeQuantityItem= (gameid, quantity)=>{
        cartCtrl.changeQuantity(gameid,quantity);
        refreshCart();
    }
    const deleteItem = (gameID) =>{
        cartCtrl.delete(gameID)
        refreshCart()
    }
    const deteleAllItems = () =>{
        cartCtrl.deteAll()
        refreshCart()
    }
    const data ={
        cart,
        addCart,
        total,
        deleteItem,
        deteleAllItems,
        changeQuantityItem
    };
    return <CartContext.Provider value={data} >{children}</CartContext.Provider>
}