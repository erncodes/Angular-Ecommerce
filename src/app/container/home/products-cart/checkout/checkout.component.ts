import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/services/productCart.services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartService : CartService = inject(CartService);
  standardShipping_Fee : number = 75;
  fastShipping_Fee : number = 125;
  cartTotal : number = 0;
  promoCode : string = '';
  selectedDelivery : string = '';
  promoDiscount : number = 0;
  IsPromoApplied : boolean = false;
  cartProducts : any[] = [];
  showPaymentPage : boolean = false;
  ngOnInit(){
    this.cartService.cartItemsSubject.subscribe((products)=>{
      this.cartProducts = products;
    });
    this.cartService.cartTotalSubject.subscribe((total)=>{
      this.cartTotal = total;
    })
  }
  ApplyPromoCode(input : any, selectedDelivery: any){
    if(input.value === this.cartService.promoCode5){
       this.cartTotal = (this.cartTotal - ((this.cartTotal) * 0.05) + +selectedDelivery);
       this.promoDiscount = this.cartTotal * 0.05;
       this.IsPromoApplied = true;
     }
     else if(input.value === this.cartService.promoCode10){
       this.cartTotal = (this.cartTotal - ((this.cartTotal) * 0.10)) + +selectedDelivery;
       this.promoDiscount = this.cartTotal * 0.05;
       this.IsPromoApplied = true;
     }
     else
     this.cartTotal = this.cartTotal;
   }
   CreateOrder(ngForm : NgForm){
    if(ngForm.invalid){
      this.showPaymentPage = !this.showPaymentPage;
    }
    else{
      console.log(ngForm.value);
    }
   }
}
