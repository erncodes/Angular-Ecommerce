import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/productCart.services';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit{

  cartCount : number = 0;
  cartProducts : any[] = [];
  isToggleOpen : boolean = false;
  isLoggedIn : boolean = false;

  cartService : CartService = inject(CartService);
  authService : AuthService = inject(AuthService);
  notifyService : NotificationService = inject(NotificationService);

  ngOnInit(){
    this.cartService.GetCartProducts().subscribe({
      next : (prodArray) => 
        {
        this.cartProducts = prodArray;
        this.cartCount = this.cartProducts.length;
        },
        error : (error) => { this.notifyService.ShowErrorNotification(error) }
    });

    this.authService.userSubject.subscribe({
      next : (user) => { this.isLoggedIn = user? true : false },
      error: (error) => { this.notifyService.ShowErrorNotification(error) }
    });

  }

  GoHome(){
    scrollTo({top:0,left:0,behavior:'smooth'})
  }
  
  ToggleNav(){
    this.isToggleOpen = !this.isToggleOpen;
  }
}
