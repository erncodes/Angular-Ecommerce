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
  cartCount : number = 0;
  cartProducts : any[] = [];
  cartService : CartService = inject(CartService);


  ngOnInit(){
    this.cartService.GetCartProducts().subscribe((prodArray)=>{
      this.cartProducts = prodArray;
      this.cartCount = this.cartProducts.length;
      this.GetCartTotal();
    }
  )
  }
  RemoveItem(prod : any){
   this.cartService.RemoveFromCart(prod);
  }
  IncreaseQuantity(prod : any){
    this.cartService.IncreaseQuantity(prod);
  }
  DecreaseQuantity(prod : any){
    this.cartService.DecreaseQuantity(prod);
  }
  GetCartTotal(){
   this.cartTotal = this.cartService.cartTotal;
  }
  ClearCart(){
    this.cartTotal = 0;
  }

}
