import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/productCart.services';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit{
  faTrashAlt = faTrashAlt;
  cartTotal : number = 0;
  cartCount : number = 0;
  cartProducts : any[] = [];
  cartService : CartService = inject(CartService);


  ngOnInit(){
    this.cartService.GetCartProducts().subscribe((prodArray)=>{
      this.cartProducts = prodArray;
      this.cartCount = this.cartProducts.length;
    });
  this.cartService.cartTotalSubject.subscribe((total)=>{
    this.cartTotal = total;
  });
  }
  RemoveItem(prod : any){
   this.cartService.RemoveFromCart(prod);
   if(this.cartCount === 0){this.ClearCart()}
  }
  IncreaseQuantity(prod : any){
    this.cartService.IncreaseQuantity(prod);
  }
  DecreaseQuantity(prod : any){
      this.cartService.DecreaseQuantity(prod);
  }
  ClearCart(){
    this.cartTotal = 0;
  }

}
