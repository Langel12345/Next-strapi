import {ENV} from '@/utils';

export class Game {

    async getLastPubished(){

        try {
            const sort='sort=publishedAt:desc';
            const pagination='pagination[limit]=1';
            const populate='populate=*';
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.GAME}?${sort}&${pagination}&${populate}`;
            const response = await fetch(url);
            const result = await response.json();

            if(response.status !==200) throw result;
            return result;
        } catch (error) {
            throw  error;
        }
    }
    async getLastestPublished( {limit =9,platformId=null}){

        try {
            const filterPlatform=platformId && `filters[plataform][id][$eq]=${platformId}`;
            const limitPagination=`pagination[limit]=${limit}`;
            const sort =`sort[0]=publishedAt:desc`;
            const populate='populate=*';
            const urlParams=`${sort}&${limitPagination}&${filterPlatform}&${populate}`
            const  url =`${ENV.API_URL}/${ENV.ENDPOINS.GAME}?${urlParams}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            
        }
    }
    async getGamesByPlatformSlug(slug,page){
        try {
            const filters=`filters[plataform][slug][$eq]=${slug}`;
            const pagination=`pagination[page]=${page}&pagination[pageSize]=30`;
            const populate='populate=*';
            const urlParams=`${filters}&${pagination}&${populate}`;
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.GAME}?${urlParams}`;
            const response = await fetch(url);
            const result = await response.json()
            if(response.status !==200) throw result;
            return result;
        } catch (error) {
            throw error;
        }

    }

    async searchGame(text, page){

        try {
            const filters =`filters[title][$contains]=${text}`;
            const pagination =`pagination[page]=${page}&pagination[pageSize]=30`;
            const populate='populate=*';
            const urlParams=`${filters}&${pagination}&${populate}`;
            const url=`${ENV.API_URL}/${ENV.ENDPOINS.GAME}?${urlParams}`;
            const response = await fetch(url);
            const result  = await response.json();

            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getGameBySlug(slug){
        try {
            const filter =`filters[slug][$eq]=${slug}`;
            const popluetePlataform='populate[4]=plataform.icon'
            const populateGame='populate[0]=wallpaper&populate[1]=cover&populate[2]=screenshots&populate[3]=plataform';
            const populates=`${populateGame}&${popluetePlataform}`
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.GAME}?${filter}&${populates}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result.data[0];
        } catch (error) {
            throw error;
        }
    }
    async getGameByID(id){
        try {
            const populate='populate[0]=cover&populate[1]=plataform';
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.GAME}/${id}?${populate}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !==200) throw result;
            return result;
         } catch (error) {
            throw error;
        }
    }
}