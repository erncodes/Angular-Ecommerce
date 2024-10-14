import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartObject } from "../models/cartObject";

@Injectable({
    providedIn: 'root'
})
export class CartService{
    constructor(){
    const localCartProducts = localStorage.getItem("CartProducts");
            if(localCartProducts){
                this.cartProducts = JSON.parse(localCartProducts);
                this.cartItemsSubject.next(this.cartProducts);
                this.cartTotal =this.GetCartTotal(this.cartProducts);
                this.cartTotalSubject.next(this.cartTotal);
            }
            else
            {
                localStorage.setItem("CartProducts","[]");
            }
    }
    cartItemsSubject : BehaviorSubject<CartObject[]> = new BehaviorSubject<CartObject[]>([]);
    cartProducts : CartObject[] = [];
    cartTotal : any = 0;
    promoCode5 : string = 'Urban5';
    promoCode10 : string = 'Urban10';
    cartTotalSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);

    GetCartProducts(){
        return this.cartItemsSubject.asObservable();
    }

    AddToCart(prod : CartObject, id : string | undefined){
        var productInCart = this.cartProducts.find(product=>product.id === id);
        console.log(productInCart);
        if(productInCart){
            console.log("found Something");
            this.IncreaseQuantity(prod);
            this.cartItemsSubject.next(this.cartProducts);
            this.cartTotalSubject.next(this.cartTotal);
        }
        else{
            this.cartProducts.push(prod);
            this.cartTotal += prod.price;
            this.cartItemsSubject.next(this.cartProducts);
            this.cartTotalSubject.next(this.cartTotal);
            localStorage.setItem("CartProducts", JSON.stringify(this.cartProducts));
        }
    }
    RemoveFromCart(prod : any, index : number){
        this.cartProducts.splice(index,1);
        this.cartTotal -= (prod.price * prod.quantity);
        this.cartItemsSubject.next(this.cartProducts);
        this.cartTotalSubject.next(this.cartTotal);
        localStorage.setItem("CartProducts", JSON.stringify(this.cartProducts));
    }
    IncreaseQuantity(prod : CartObject){
        if(prod.quantity < prod.leftInStock)
            {
                prod.quantity ++;
                this.cartTotal += prod.price;
                this.cartItemsSubject.next(this.cartProducts);
                localStorage.setItem("CartProducts", JSON.stringify(this.cartProducts));
                this.cartTotalSubject.next(this.cartTotal);
            }
    }
    DecreaseQuantity(prod : CartObject){
        if(prod.quantity >= 2){
            prod.quantity --;
            this.cartTotal -= prod.price;
            this.cartItemsSubject.next(this.cartProducts);
            localStorage.setItem("CartProducts", JSON.stringify(this.cartProducts));
            this.cartTotalSubject.next(this.cartTotal);
        }
    }
    ApplyPromoCode(input : any){
        if(input.value === this.promoCode5){
           this.cartTotal = this.cartTotal - ((this.cartTotal) * 0.05);
         }
         else if(input.value === this.promoCode10){
           this.cartTotal = (10/this.cartTotal) * 100;
         }
         else
         this.cartTotal = this.cartTotal;
       }
    GetCartTotal(array : CartObject[]){
        var total = 0;
        array.forEach((obj)=>{
            total+= (obj.price * obj.quantity);
        })
        return total;
    }
    ClearCart(){
        localStorage.removeItem("CartProducts");
        this.cartProducts = [];
    }
}