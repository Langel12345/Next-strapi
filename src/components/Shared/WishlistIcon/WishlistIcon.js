import classNames from 'classnames';
import styles from './WishlistIcon.module.scss';
import {Icon} from 'semantic-ui-react';
import { WishList } from '@/api';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks'
const wishlistCtrl = new WishList();

export  function WishlistIcon(props) {
    const {gameId, className,removeCallback} = props;
    const [haswishlist, setHaswishlist] = useState(null);
    const {user }= useAuth();
   
    useEffect(() => {
        ( async () =>{
          try {
            const response = await wishlistCtrl.check(user.id,gameId);
            setHaswishlist(response)
          } catch (error) {
            setHaswishlist(null);
            throw error;
          }
        })()
    }, [gameId]);

    const addWishlist = async () =>{
      const response = await wishlistCtrl.add(user.id,gameId);
      setHaswishlist(response);
    }
    const deleteWishList = async ()=>{
        try {
          await wishlistCtrl.delete(haswishlist.id);
          setHaswishlist(null);
          if(removeCallback)  removeCallback();
         } catch (error) {
          console.log(error)
        }
    }
    if(haswishlist == null) return null;
    return (
    <Icon 
        
        name={haswishlist ? 'heart' :'heart outline'} 
        onClick={haswishlist ? deleteWishList:addWishlist}
        className={classNames(styles.whilistIcon,{ 
        [className] :className
    })} />
  )
}
