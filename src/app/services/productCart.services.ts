import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class CartService{

    cartItemsSubject : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    cartProducts : Product[] = [];
    cartTotal : any = 0;
    cartTotalSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);

    GetCartProducts(){
        return this.cartItemsSubject.asObservable();
    }

    AddToCart(prod : any){
        this.cartProducts.
        forEach((prod)=>{
            Object.assign(prod,{quantity : 1});
          });
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

    RemoveFromCart(prod : any){
        this.cartProducts.splice(prod.index,1);
        this.cartTotal -= prod.price * prod.quantity;
        this.cartItemsSubject.next(this.cartProducts);
        this.cartTotalSubject.next(this.cartTotal);

    }
    IncreaseQuantity(prod : any){
        if(prod.quantity < prod.leftInStock)
            {
                prod.quantity ++;
                this.cartTotal += prod.price;
                 this.cartItemsSubject.next(this.cartProducts);
                 this.cartTotalSubject.next(this.cartTotal);
            }
    }
    DecreaseQuantity(prod : any){
        if(prod.quantity >= 2){
            prod.quantity --;
            this.cartTotal -= prod.price;
            this.cartItemsSubject.next(this.cartProducts);
            this.cartTotalSubject.next(this.cartTotal);
        }
    }
 
}