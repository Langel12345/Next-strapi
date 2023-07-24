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
}