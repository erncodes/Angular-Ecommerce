import { Component, inject, Inject } from '@angular/core';
import { CartObject } from 'src/app/models/cartObject';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from 'src/app/services/productCart.services';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  selectedColor : string = '';
  selectedSize : number = 0;
  wishListProducts : CartObject[] = [];
  notificationService : NotificationService = inject(NotificationService);
  selectedProduct : any;
  constructor(private cartService : CartService){}

  ngOnInit(){
    var localWishList = localStorage.getItem("WishList");
    if(localWishList){
      this.wishListProducts = JSON.parse(localWishList);
    }
  }
  AddToCart(product : CartObject , index : number){
    this.selectedProduct = product;
    this.isSelected(index, product);
  }
  RemoveFromWishList(index : number){
        this.wishListProducts.splice(index,1);
        localStorage.setItem("WishList", JSON.stringify(this.wishListProducts));
  }
  ClearWishList(){
    this.wishListProducts = [];
    localStorage.removeItem("WishList");
  }
  isSelected(i : number, product : CartObject){
    var productFromArray = this.wishListProducts.filter(product => product == this.wishListProducts[i]);
    if(productFromArray[0].id == product.id){
      return true;
    }
    return false;
  }
  CancelAddToCart(){
    this.selectedProduct = '';
  }
  ConfirmAddToCart(wishItem : CartObject, i : number){
    if(this.selectedColor){
      wishItem.color = this.selectedColor;
      if(this.selectedSize != 0 && this.selectedSize.toString() != "Choose"){
        wishItem.size = this.selectedSize;
        this.cartService.AddToCart(wishItem,this.selectedProduct.id);
        this.notificationService.ShowSuccessNotification();
        this.selectedProduct = '';
        this.RemoveFromWishList(i);
      }
      else{
        this.notificationService.ShowErrorNotification('Please Choose Size');
      }
    }
    else{
      this.notificationService.ShowErrorNotification('Please Choose Color');
    }
  }
}
