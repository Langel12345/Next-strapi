import { ENV, authFetch} from "@/utils";

export class Address{
    async create(data, userId){
        try {
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.ADDRESS}`;
            const params={
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({data:{
                    ...data,
                    user: userId
                }})
            }
            const response = await authFetch(url, params);
            const result = await response.json();
            if(response !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }

    async getAll(userId){

        try {
            const filters=`filters[user][id][$eq]=${userId}`
            const url = `${ENV.API_URL}/${ENV.ENDPOINS.ADDRESS}?${filters}`;
            const response = await authFetch( url);
            const result = response.json();
            if(response.status !==200) throw error;
            return result;
        } catch (error) {
            throw error
        }
    }
    async update(data, addresId){

        try {
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.ADDRESS}/${addresId}`;
            const params={
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({data})
            }
            const response = await authFetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;
            
        } catch (error) {
            throw error;
        }
    }
    async delete(addressId){

        try {
            const  url =`${ENV.API_URL}/${ENV.ENDPOINS.ADDRESS}/${addressId}`;
            const params={
                method:"DELETE"
            }
            const response = await authFetch(url, params);
            const result = await response.json()
            if(response.status !==200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }
}