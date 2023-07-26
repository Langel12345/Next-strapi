import { ENV, authFetch }  from "@/utils";

export class WishList{

    async check(userId, gameId){
        try {
            const filterUser=`filters[user][id][$eq][0]=${userId}`;
            const filterGame=`filters[game][id][$eq][1]=${gameId}`;
            const urlParamas=`${filterUser}&${filterGame}`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINS.WISHLIST}?${urlParamas}`;
            const response = await authFetch(url);
            const result = await response.json();
            if(response.status !==200) throw result;
            if(result.data.length === 0) return false;

            return result.data[0];
         } catch (error) {
            throw error;
        }
    }

    async add(userId,gameId){

        try {
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.WISHLIST}`;
            const params ={
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    data:{
                        user: userId,
                        game:gameId
                    }
                 
                })
            }
            const response = await authFetch(url,params);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result.data;
        } catch (error) {
            throw error;
        }
    }
    async delete(id){

        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINS.WISHLIST}/${id}`;
            const params={
                method:"DELETE"
            }
            const response = await authFetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            
        }
    }
    async getAll(userID){

        try {
            const filterUser=`filters[user][id][$eq][0]=${userID}`;
            const populate=`populate[0]=game&populate[1]=game.cover`;
            const urlParams=`${filterUser}&${populate}`
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.WISHLIST}?${urlParams}`;
            const response = await authFetch(url);
            const result = await response.json();
            if(response.status !==200) throw result;
            return result.data
        } catch (error) {
            throw error;
        }
    }
}