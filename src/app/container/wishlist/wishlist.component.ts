import { Component, Inject } from '@angular/core';
import { CartObject } from 'src/app/models/cartObject';
import { CartService } from 'src/app/services/productCart.services';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishListProducts : CartObject[] = [];
  cartService : CartService= Inject(CartService);

  ngOnInit(){
    var localWishList = localStorage.getItem("WishList");
    if(localWishList){
      this.wishListProducts = JSON.parse(localWishList);
    }
  }
  AddToCart(product : CartObject , index : number){
    this.cartService.AddToCart(product, product.id);
    this.wishListProducts.splice(index,1);
    localStorage.setItem("WishList", JSON.stringify(this.wishListProducts));
  }
  RemoveFromWishList(index : number){
        this.wishListProducts.splice(index,1);
        localStorage.setItem("WishList", JSON.stringify(this.wishListProducts));
  }
  ClearWishList(){
    this.wishListProducts = [];
    localStorage.removeItem("WishList");
  }
}
