import { ENV} from '@/utils';

export class Platforms{
    async getAll(){
        try {
            const sort ="sort=order:asc";
            const populate="populate=icon"
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.PLATFORM}?${populate}&${sort}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            
        }
    }

    async getBySlug(slug){

        try {
            const filters=`filters[slug][$eq]=${slug}`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINS.PLATFORM}?${filters}`;
            const response = await fetch(url);
            const result = await response.json()
            if(response.status !== 200) throw result
            return result.data[0];
        } catch (error) {
            throw error
        }
    }
}