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
  cartService : CartService = inject(CartService);
  prodService : ProductService = inject(ProductService);
  notificationService : NotificationService = inject(NotificationService);

  selectedProd : any;
  similarProduct : any;
  selectedSize : number = 0;
  selectedColor : string = '';
  similarProducts : Product[] = [];
  router : Router = inject(Router);
  cartObj : any;
  wishList : CartObject[] = [];

  ngOnInit(){
    this.selectedProd = history.state;
    this.cartObj = new CartObject( this.selectedProd?.id, this.selectedProd.title, this.selectedProd.description,this.selectedProd.brand,
    this.selectedSize , this.selectedColor, this.selectedProd.imageUrl, this.selectedProd.price,1,
    this.selectedProd.isInStock,this.selectedProd.leftInStock,this.selectedProd.colors,this.selectedProd.sizes,this.selectedProd.rating,this.selectedProd.dateAdded);
    this.prodService.GetSimilarProducts(this.selectedProd);
    this.similarProducts = this.prodService.GetSimilarProducts(this.selectedProd);
    this.cd.detectChanges();
  }
  AddToCart(prod : CartObject){
   
    if(this.selectedColor){
      prod.color = this.selectedColor;
      if(this.selectedSize != 0 && this.selectedSize.toString() != "Choose"){
        prod.size = this.selectedSize;
        this.cartService.AddToCart(prod, prod.id);
        this.notificationService.ShowSuccessNotification();
      }
      else{
        this.notificationService.ShowErrorNotification('Please Choose Size');
      }
    }
    else{
      this.notificationService.ShowErrorNotification('Please Choose Color');
    }
  }
  ViewProduct(prod :Product){
    this.router.navigate(['Home','Product-View'],{})
    this.cd.detectChanges();
  }
  AddToWishList(cartObj : CartObject){
      this.wishList.push(cartObj);
      localStorage.setItem("WishList",JSON.stringify(this.wishList));
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
