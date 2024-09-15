import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/productCart.services';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Product } from '../models/product';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent{
  faTrashAlt = faTrashAlt;
  cartTotal : number = 0;
  prodQuantity : number = 1;
  cartCount : number = 0;
  cartProducts : any[] = [];
  cartService : CartService = inject(CartService);

  ngOnInit(){
    this.cartService.AddToCartItem.subscribe((prod)=>{
      if(this.cartProducts.includes(prod)){
            this.cartTotal += prod.price;
      }
      else{
      this.cartProducts.push(prod);
      this.cartCount = this.cartProducts.length;
      this.cartProducts.forEach((prod)=>{
      this.cartTotal += prod.price;
      })
    }
    })
  }
  RemoveItem(prod : any){
    this.cartProducts.splice(prod.index ,1);
    this.cartCount = this.cartProducts.length;
    this.cartTotal -= prod.price;
  }

}
