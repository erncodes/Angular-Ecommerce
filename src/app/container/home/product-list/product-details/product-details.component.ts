import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
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
  constructor(private cd : ChangeDetectorRef){}
  selectedProd : any;
  similarProduct : any;
  selectedSize : number = 0;
  selectedColor : string = '';
  prodService : ProductService = inject(ProductService);
  cartService : CartService = inject(CartService);
  cartProducts : Product[] = [];
  similarProducts : Product[] = [];
  router : Router = inject(Router);
  snackBar : MatSnackBar = inject(MatSnackBar);
  notificationService : NotificationService = inject(NotificationService);
  cartObj : any;

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
}
