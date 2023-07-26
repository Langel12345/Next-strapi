
export {default} from './game';
export async function getServerSideProps(context){

    const { params : {game}} = context;
    
    
    return{
        props:{
            slug:game
        }

    }
}