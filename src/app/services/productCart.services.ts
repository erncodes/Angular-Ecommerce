import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService{

    AddToCartItem : ReplaySubject<any> = new ReplaySubject<any>();

    RemoveFromCart(item : any){

    }
}