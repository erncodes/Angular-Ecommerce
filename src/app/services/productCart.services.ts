import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class CartService{

    cartItemsSubject : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    cartProducts : Product[] = [];
    cartTotal : any = 0;

    GetCartProducts(){
        return this.cartItemsSubject.asObservable();
    }

    AddToCart(prod : Product){
        this.cartProducts.push(prod);
        this.cartProducts.
        forEach((prod)=>{
            Object.assign(prod,{quantity : 1, total : prod.price });
          });
        this.cartTotal += prod.price;
        this.cartItemsSubject.next(this.cartProducts);
    }

    RemoveFromCart(prod : any){
        this.cartProducts.splice(prod.index,1);
        this.cartTotal -= prod.price;
        this.cartItemsSubject.next(this.cartProducts);
    }
    IncreaseQuantity(prod : any){
        if(prod.quantity < prod.leftInStock)
            {
                prod.quantity ++;
                this.cartTotal += prod.price;
                 this.cartItemsSubject.next(this.cartProducts);
            }
    }
    DecreaseQuantity(prod : any){
        if(prod.quantity >= 2){
            prod.quantity --;
            this.cartTotal -= prod.price;
             this.cartItemsSubject.next(this.cartProducts);
        }
    }
 
}