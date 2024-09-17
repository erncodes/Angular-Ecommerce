import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/productCart.services';
import { Product } from '../models/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartService : CartService = inject(CartService);
  cartProducts : any[] = [];
  ngOnInit(){
    this.cartService.cartItemsSubject.subscribe((products)=>{
      this.cartProducts = products;
    })
  }
}
