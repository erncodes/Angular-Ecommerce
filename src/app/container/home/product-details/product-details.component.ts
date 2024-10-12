import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
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

  selectedProd : any;
  selectedSize : number = 0;
  selectedColor : string = '';
  prodService : ProductService = inject(ProductService);
  cartService : CartService = inject(CartService);
  cartProducts : Product[] = [];
  similarProducts : Product[] = [];
  router : Router = inject(Router);
  snackBar : MatSnackBar = inject(MatSnackBar);
  notificationService : NotificationService = inject(NotificationService);

  ngOnInit(){
    this.prodService.productClicked.subscribe((prod : Product)=>{
      let cartObj = new CartObject( prod?.id, prod.title, prod.description,prod.brand, this.selectedSize , this.selectedColor, prod.imageUrl, prod.price,1,
        prod.isInStock,prod.leftInStock,prod.colors,prod.sizes,prod.rating,prod.dateAdded);
      this.selectedProd = cartObj;
      this.similarProducts = this.prodService.GetSimilarProducts(prod);
    });
  }
  AddToCart(prod : CartObject){
    this.cartService.AddToCart(prod);
    this.notificationService.ShowSuccessNotification();
  }
  ViewProduct(similarProd : Product){
    this.prodService.ViewProduct(similarProd);
    this.router.navigate(['Home','Product-view']);
    scrollTo({top:0,left:0,behavior: 'smooth'});
  }
  PostProducts(){
    this.prodService.PostProductsToApi();
  }
 
}
