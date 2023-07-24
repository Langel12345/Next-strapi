export function calcDiscountedPrice(price,descount){
    if(!descount )return price;

    const discountAmount =(price * descount)/100;
    const finalPrice  = price - discountAmount;

    return finalPrice;
}