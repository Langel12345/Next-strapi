import { useState, useEffect} from 'react'
import {Game } from '@/api';
import {GridGames} from '@/components/Shared'
const gameCtrl = new Game();

export  function LastestGame(props) {
    const {title, limit =9, platformId =null}= props;
    const [games, setGames] = useState(null);
    useEffect(() => {
        ( async () =>{
            try {
                const response = await gameCtrl.getLastestPublished({limit, platformId})
                setGames(response.data);
            } catch (error) {
                    console.error(error);
            }
        })()
    }, [])
    if(!games) return null;
    return (
        <div>
            <h2>{title}</h2>
            <GridGames games={games} />
        </div>
    ) 
}
