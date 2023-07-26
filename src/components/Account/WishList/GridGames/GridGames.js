import Link from 'next/link';
import styles from './GridGames.module.scss'
import { map } from 'lodash';
import { Label,WishlistIcon } from '@/components/Shared';
import { ENV, fn } from '@/utils';
export  function GridGames(props) {
    const {wishlist,onReload} =props;

    return (
        <div className={styles.GridGames}>
            {
                map(wishlist, (item) =>{
                    const game = item.attributes.game.data;
                    const cover =game.attributes.cover.data
                    return (
                        <div className={styles.game} key={item.id}>
                            <Link href={`/${game.attributes.slug}`}>
                                <div>
                                    <img src={`${ENV.SERVER_HOST}${cover.attributes.url}`} />
                                    {
                                        game.attributes.discount > 0 && (
                                            <Label.Discount className={styles.discount}>
                                                {`- ${game.attributes.discount}%`}
                                            </Label.Discount>
                                        )
                                    }
                                </div>
                                <div>
                                    <span>{game.attributes.title} </span>
                                    <span className={styles.price}>
                                        $ {fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)}
                                    </span>
                                </div>
                            </Link>
                            <WishlistIcon gameId={game.id} className={styles.whilistIcon} removeCallback={onReload}/>
                        </div>
                    )
                } )
            }
            
        </div>
    )
}
