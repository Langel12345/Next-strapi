import { Game } from '@/api';
import { BasicLayout } from '@/layouts';
import { useEffect, useState } from 'react';
import { Game as GameComponent } from '@/components/Game'
import { Separator } from '@/components/Shared';
const gameCtrl = new Game();
export default function GamePage(props) {
  const { slug } = props;
  const [game, setGame] = useState(null)
  useEffect(() => {
     ( async () =>{
        const response = await gameCtrl.getGameBySlug(slug);
        setGame(response)
     }
     )()
  }, [])
  if(!game) return null;
  const wallpaper =game.attributes.wallpaper;
  return (
    <>
        <BasicLayout>
            <GameComponent.HeaderWallpaper image={wallpaper.data.attributes.url}/>
            <GameComponent.Panel gameId={game.id} game ={game.attributes}/>
            <Separator height={50}/>
            <GameComponent.Info game={game.attributes} />
            <Separator height={30}/>
            <GameComponent.Media  video={game.attributes.video} imagenes={game.attributes.screenshots.data} />
            <Separator height={50} /> 
        </BasicLayout>
    </>
  )
}
