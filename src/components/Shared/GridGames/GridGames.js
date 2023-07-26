import { map} from 'lodash';
import {fn,ENV} from '@/utils';
import Link from 'next/link';
import styels from './GridGames.module.scss'
import { Label } from '@/components/Shared'

export  function GridGames(props) {
    const { games} = props;
  
    return (
        <div className={styels.gridGames}>
            {map(games,(game)=>(
                <Link key={game.id} href={`/${game.attributes.slug}`} className={styels.game}>
                    <div>
                        <img src={`${ENV.SERVER_HOST}${game.attributes.cover.data.attributes.url}`} />
                        {game.attributes.discount > 0 &&(
                            <Label.Discount className={styels.discount}>
                                {`-${game.attributes.discount}%`}
                            </Label.Discount>
                        )}
                    </div>
                    <div>
                        <span>{game.attributes.title}</span>
                        <span className={styels.price}>
                            $ 
                            {
                                fn.calcDiscountedPrice(
                                    game.attributes.price,
                                    game.attributes.discount
                                )
                            }
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
