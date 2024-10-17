import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from 'src/app/services/productCart.services';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit{
  promoCode :string ='';
  cartTotal : number = 0;
  cartCount : number = 0;
  cartProducts : any[] = [];
 
  cartService : CartService = inject(CartService);
  notifyService : NotificationService = inject(NotificationService);

  ngOnInit(){
    this.cartService.GetCartProducts().subscribe({
      next : (prodArray) => {
      this.cartProducts = prodArray;
      this.cartCount = this.cartProducts.length; },
      error : (error) => { this.notifyService.ShowErrorNotification(error) }
    });

    this.cartService.cartTotalSubject.subscribe({
      next : (total) => { this.cartTotal = total; },
      error : (error) => { this.notifyService.ShowErrorNotification(error) }
    });
  }

  RemoveItem(prod : any , index : number){
   this.cartService.RemoveFromCart(prod, index);
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
