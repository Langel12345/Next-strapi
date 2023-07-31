import { ENV,authFetch, fn } from "@/utils";
import { forEach } from "lodash";
import { uuid } from 'uuidv4';

export class Cart {

    add(gameId){
        const games = this.getAll();
        const objIndex = games.findIndex((game) => game.id ===gameId);
        if(objIndex < 0){
            games.push({id:gameId,quantity:1})
        }else{
            const game = games[objIndex];
            games[objIndex].quantity = game.quantity+1;
        }

        localStorage.setItem(ENV.CART, JSON.stringify(games))
    }
    getAll(){
        const response = localStorage.getItem(ENV.CART);
        if(!response) return [];
        return JSON.parse(response);
    }
    count(){
        const response  = this.getAll();
        let count =0;
        forEach(response, (item) =>{
            count += item.quantity;
        });
        return count;
    }
    changeQuantity(gameId, quantity){
        const games = this.getAll();
        const objIndex = games.findIndex((game) => game.id === gameId);
        games[objIndex].quantity = quantity;
        localStorage.setItem(ENV.CART, JSON.stringify(games));

    }
    delete(gameID){
        const games= this.getAll();
        const updateGames = games.filter((game) => game.id !== gameID);
        localStorage.setItem(ENV.CART, JSON.stringify(updateGames))
    }
    deteAll(){
        localStorage.removeItem(ENV.CART);
    }
    async paymentCart(token, products, idUser,address){
        try {
            const  url =`${ENV.API_URL}/${ENV.ENDPOINS.PAYMENT_ORDER}`;
            const params ={
                method:"POST",
                headers :{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    token,
                    products,
                    idUser,
                    addressShoping: address
                })
            }
            const response = await authFetch(url, params);
           return response;
        } catch (error) {
            throw error;
        }
    }
    async createOrder(products,idUser, address){
        let totalPayment =0;
        products.forEach((product )=>{
            console.log(product.attributes.price)
            const priceTemp =fn.calcDiscountedPrice(product.attributes.price, product.attributes.discount);
            totalPayment +=Number(priceTemp) * product.quantity;
        });
        try {
            const url =`${ENV.API_URL}/${ENV.ENDPOINS.ORDERS}`;
            const params ={
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({data:{
                    products,
                    user:idUser,
                    idPayment:uuid(),
                    totalPayment,
                    addressShoping: address
                }})
            }
            const response = await  authFetch(url, params);
            return response;
        } catch (error) {
            throw error
        }
    }
}