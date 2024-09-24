import { Component, inject, OnInit } from '@angular/core';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CartService } from 'src/app/services/productCart.services';

@Component({
  selector: 'app-main-header',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit{
  faShoppingBag = faShoppingBag;
  faUser = faUser;
  cartService : CartService = inject(CartService);
  cartProducts : any[] = [];
  cartCount : number = 0;
  isToggleOpen : boolean = false;

  ngOnInit(){
    this.cartService.GetCartProducts().subscribe((prodArray)=>{
      this.cartProducts = prodArray;
      this.cartCount = this.cartProducts.length;
    }
  )
  }

  ToggleNav(){
    this.isToggleOpen = !this.isToggleOpen;
  }
}
