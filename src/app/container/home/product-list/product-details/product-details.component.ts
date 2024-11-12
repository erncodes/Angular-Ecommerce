import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  cartObj : CartObject | undefined;
  selectedProd : Product | undefined;
  similarProduct : any;
  selectedSize : number = 0;
  selectedColor : string = '';
  wishList : CartObject[] = [];
  similarProducts : Product[] = [];
  
  cartService : CartService = inject(CartService);
  activeRoute : ActivatedRoute = inject(ActivatedRoute);
  prodService : ProductService = inject(ProductService);
  notifyService : NotificationService = inject(NotificationService);
  
  ngOnInit(){
    scrollTo({top:0,left:0,behavior: 'smooth'});
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    this.cd.detectChanges();
    if(productId)
    {
      this.prodService.GetProductById(productId);
      this.prodService.productClicked.subscribe((prod)=>{
        this.selectedProd = prod;
        this.cartObj = new CartObject( prod.id, prod.title, prod.description, prod.brand,
          this.selectedSize , this.selectedColor, prod.imageUrl, prod.price, 1, prod.isInStock,
          prod.leftInStock,  prod.colors, prod.sizes,  prod.rating, 
          prod.dateAdded);
          if (this.selectedProd){
            this.prodService.GetSimilarProducts(this.selectedProd)
          }
          this.similarProducts = this.prodService.GetSimilarProducts(prod);
      })
    }
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

  ViewProduct(id? : string){
    scrollTo({top:0,left:0,behavior: 'smooth'});
    this.prodService.GetProductById(id);
    this.cd.detectChanges();
  }

  AddToWishList(cartObj : CartObject | undefined){
    if(cartObj)
      this.wishList.push(cartObj);
      localStorage.setItem("WishList",JSON.stringify(this.wishList));
      this.notifyService.ShowSuccessNotification("Added To Wishlist");
  }
  
  IsWishItem(product? : CartObject){
    if(this.wishList){
      var isWishItem = this.wishList.find( wishitem => wishitem.id == product?.id);
      if(isWishItem){
        return true;
      }
      return false;
    }
    return false;
  }
}
