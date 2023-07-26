import { useState, useEffect } from "react";
import {WishList as WishListApi} from '@/api';
import {useAuth} from '@/hooks';
import {NoResult} from '@/components/Shared';
import { size } from "lodash";
import {GridGames} from './GridGames'
const wishlisCtrl = new WishListApi();
export  function WishList() {
    const {user} = useAuth();
    const [wishlist, setWishlist] = useState(null);
    const [reload, setreload] = useState(false);
    const onReload =() => setreload( prevState => !prevState);
    useEffect(() => {
        (async () =>{
            try {
                const response = await wishlisCtrl.getAll(user.id);
                setWishlist(response)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [reload])
    
  return size(wishlist) === 0 ?(
    <NoResult text="No tienes ningun juego en la lista de deseos" />
  ):(
    <GridGames wishlist={wishlist} onReload={onReload} />
  )
}
