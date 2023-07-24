import {ENV,authFetch} from '@/utils';

export class User {
    async getMe(){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINS.USERS_ME}`;
            
            const response = await authFetch(url);
            const result = await response.json()
            if(response.status !==200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateMe(userId, data){

        try {
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.USERS}/${userId}`;
            const params={
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }
            const response  = await  authFetch(url,params);
            const result = await response.json();

            if(response.status !== 200) throw result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}