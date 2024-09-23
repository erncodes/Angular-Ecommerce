import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartObject } from "../models/cartObject";

@Injectable({
    providedIn: 'root'
})
export class CartService{

    cartItemsSubject : BehaviorSubject<CartObject[]> = new BehaviorSubject<CartObject[]>([]);
    cartProducts : CartObject[] = [];
    cartTotal : any = 0;
    promoCode5 : string = 'Urban5';
    promoCode10 : string = 'Urban10';
    cartTotalSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);

    GetCartProducts(){
        return this.cartItemsSubject.asObservable();
    }

    AddToCart(prod : CartObject){
        this.GetCartProducts();
        if(this.cartProducts.includes(prod)){
            this.IncreaseQuantity(prod);
            this.cartItemsSubject.next(this.cartProducts);
            this.cartTotalSubject.next(this.cartTotal);
        }
        else{
            this.cartProducts.push(prod);
            this.cartTotal += prod.price;
            this.cartItemsSubject.next(this.cartProducts);
            this.cartTotalSubject.next(this.cartTotal);
        }
    }

    RemoveFromCart(prod : any, index : number){
        this.cartProducts.splice(index,1);
        this.cartTotal -= (prod.price * prod.quantity);
        this.cartItemsSubject.next(this.cartProducts);
        this.cartTotalSubject.next(this.cartTotal);

    }
    IncreaseQuantity(prod : CartObject){
        if(prod.quantity < prod.leftInStock)
            {
                prod.quantity ++;
                this.cartTotal += prod.price;
                 this.cartItemsSubject.next(this.cartProducts);
                 this.cartTotalSubject.next(this.cartTotal);
            }
    }
    DecreaseQuantity(prod : CartObject){
        if(prod.quantity >= 2){
            prod.quantity --;
            this.cartTotal -= prod.price;
            this.cartItemsSubject.next(this.cartProducts);
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
 
}