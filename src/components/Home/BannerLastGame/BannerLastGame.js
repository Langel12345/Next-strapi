import {useState, useEffect} from 'react';
import {Container, Image} from 'semantic-ui-react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { Game } from '@/api';
import {ENV} from '@/utils';
import { fn } from '@/utils'
import { Label } from '@/components/Shared'
import styles from './BannerLastGame.module.scss';
const gameCtrl = new Game();
export  function BannerLastGame() {
    const [game, setGame] = useState(null);

    useEffect(() => {
        (async() =>{
            try {
                const response = await gameCtrl.getLastPubished();
                setGame(response.data[0])
            } catch (error) {
                console.error(error);
            }
        } )()
    }, [])
    if(!game) return null;
    const wallpaper = game.attributes.wallpaper;
    const newData = new Date(game.attributes.realaseDate).toISOString()
    const price= fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)
    return (
        <div className={styles.container}>
            <Image src={`${ENV.SERVER_HOST}${wallpaper.data.attributes.url}`} className={styles.wallpaper}/>
            <Link className={styles.infoContainer} href={game.attributes.slug}>
                <Container>
                    <span className={styles.date}>
                        {DateTime.fromISO(newData).minus({days:1}).toRelative()}
                    </span>
                    <h2>{ game.attributes.title}</h2>

                    <p className={styles.price}>
                        <Label.Discount>-{game.attributes.discount}%</Label.Discount>
                        <span className={styles.finalPrice}>$ {price}</span>
                    </p>
                </Container>
            </Link>
        </div>
    )
}
