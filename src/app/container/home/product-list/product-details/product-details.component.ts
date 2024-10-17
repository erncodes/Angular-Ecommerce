import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartObject } from 'src/app/models/cartObject';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';
import { CartService } from 'src/app/services/productCart.services';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  constructor(private cd : ChangeDetectorRef){
    const localWishProducts = localStorage.getItem("WishList");
    if(localWishProducts){
        this.wishList = JSON.parse(localWishProducts);
    }
  }
  cartObj : any;
  selectedProd : any;
  similarProduct : any;
  selectedSize : number = 0;
  selectedColor : string = '';
  wishList : CartObject[] = [];
  similarProducts : Product[] = [];
  
  router : Router = inject(Router);
  cartService : CartService = inject(CartService);
  prodService : ProductService = inject(ProductService);
  notifyService : NotificationService = inject(NotificationService);
  
  ngOnInit(){
    this.selectedProd = history.state;
    this.cartObj = new CartObject( this.selectedProd?.id, this.selectedProd.title, this.selectedProd.description, this.selectedProd.brand,
                    this.selectedSize , this.selectedColor, this.selectedProd.imageUrl, this.selectedProd.price, 1, this.selectedProd.isInStock,
                    this.selectedProd.leftInStock,  this.selectedProd.colors, this.selectedProd.sizes,  this.selectedProd.rating, 
                    this.selectedProd.dateAdded);

    this.prodService.GetSimilarProducts(this.selectedProd);
    this.similarProducts = this.prodService.GetSimilarProducts(this.selectedProd);
    this.cd.detectChanges();
  }
  AddToCart(product : CartObject){
    if(this.selectedColor){
      product.color = this.selectedColor;
      if(this.selectedSize != 0 && this.selectedSize.toString() != "Choose"){
        product.size = this.selectedSize;
        this.cartService.AddToCart(product, product.id);
        this.notifyService.ShowSuccessNotification("Added To Cart");
      }
      else{
        this.notifyService.ShowErrorNotification('Please Choose Size');
      }
    }
    else{
        this.notifyService.ShowErrorNotification('Please Choose Color');
    }
  }

  ViewProduct(product :Product){
    this.router.navigate(['Home','Product-View'],{})
    this.cd.detectChanges();
  }

  AddToWishList(cartObj : CartObject){
      this.wishList.push(cartObj);
      localStorage.setItem("WishList",JSON.stringify(this.wishList));
      this.notifyService.ShowSuccessNotification("Added To Wishlist");
  }
  
  IsWishItem(product : CartObject){
    if(this.wishList){
      var isWishItem = this.wishList.find( wishitem => wishitem.id == product.id);
      if(isWishItem){
        return true;
      }
      return false;
    }
    return false;
  }
}
