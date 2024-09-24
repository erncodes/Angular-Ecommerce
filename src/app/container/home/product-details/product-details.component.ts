import { Component, inject, OnInit } from '@angular/core';
import { CartObject } from 'src/app/models/cartObject';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';
import { CartService } from 'src/app/services/productCart.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  constructor(){
  }
  selectedProd : any;
  selectedSize : number = 0;
  selectedColor : string = '';
  prodService : ProductService = inject(ProductService);
  cartService : CartService = inject(CartService);
  cartProducts : Product[] = [];

  ngOnInit(){
    this.prodService.productClicked.subscribe((prod : Product)=>{
      let cartObj = new CartObject( prod.id, prod.title, prod.description, this.selectedSize , this.selectedColor, prod.image, prod.price,1,
        prod.isInStock,prod.leftInStock,prod.colors,prod.sizes,prod.rating,prod.dateAdded);
      this.selectedProd = cartObj;
    });
  }
  AddToCart(prod : CartObject){
    this.cartService.AddToCart(prod);
  }
}
