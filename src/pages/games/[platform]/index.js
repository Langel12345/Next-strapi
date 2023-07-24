import { Platforms,Game } from '@/api'
export {default} from './platform';

export async function getServerSideProps(context){
    const {query,params} = context;
    const {page = 1} = query;
    const {platform }= params;
    const platformCtrl = new Platforms();
    const gameCtrl= new Game();
    const responsePlataform = await platformCtrl.getBySlug(platform);
    const responseGame = await gameCtrl.getGamesByPlatformSlug(platform,page)
    return{
        props:{
            platform:responsePlataform,
            games:responseGame.data,
            pagination:responseGame.meta.pagination
        }
    }
}