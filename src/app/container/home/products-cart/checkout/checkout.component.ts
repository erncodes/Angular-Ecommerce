import { NgForm } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/productCart.services';
import { NotificationService } from 'src/app/services/notification.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  selectedDelivery : string = '';
  promoCode : string = '';
  cartTotal : number = 0;
  order : Order | undefined = undefined; 
  promoDiscount : number = 0;
  fastShipping_Fee : number = 125;
  standardShipping_Fee : number = 75;
  showPaymentPage : boolean = false;
  IsPromoApplied : boolean = false;
  cartProducts : any[] = [];
  
  cartService : CartService = inject(CartService);
  notifyService : NotificationService = inject(NotificationService);

  ngOnInit(){
    this.cartService.cartItemsSubject.subscribe({
      next : (products) => { this.cartProducts = products; },
      error : (error) => { this.notifyService.ShowErrorNotification(error) }
    });

    this.cartService.cartTotalSubject.subscribe({
      next : (total) => { this.cartTotal = total; },
      error : (error) => { this.notifyService.ShowErrorNotification(error) }
    });

  }

  ApplyPromoCode(input : any, selectedDelivery: any)
  {
    if(input.value === this.cartService.promoCode5){
       this.cartTotal = (this.cartTotal - ((this.cartTotal) * 0.05) + (+selectedDelivery));
       this.promoDiscount = this.cartTotal * 0.05;
       this.IsPromoApplied = true;
     }
     else if(input.value === this.cartService.promoCode10){
       this.cartTotal = (this.cartTotal - ((this.cartTotal) * 0.10)) + (+selectedDelivery);
       this.promoDiscount = this.cartTotal * 0.05;
       this.IsPromoApplied = true;
     }
     else
      this.cartTotal = this.cartTotal;
  }

   CreateOrder(ngForm : NgForm){
      if(ngForm.invalid)
      {
        console.log(ngForm.value);

      }
      else
      {
        //this.order = new Order()
        this.showPaymentPage = !this.showPaymentPage;
      }
   }
}
