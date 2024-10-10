import { Component, inject, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.services';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  prodService = inject(ProductService);
  products : Product[] | undefined  = [];
  router : Router = inject(Router);
  headerText : string = 'Popular Kicks'

  ViewProduct(prod : any){
    this.prodService.ViewProduct(prod);
    this.router.navigate(['Home','Product-view']);
    scrollTo({top:0,left:0,behavior: 'instant'});
  }
  ngOnInit(){
    this.prodService.GetProducts().subscribe((prodArray)=>{
      this.products = prodArray;
    })
    this.prodService.textSubject.subscribe((text)=>{
      this.headerText = text;
    })

  }

  isNewProduct(prod:Product){
   return this.prodService.IsNewProduct(prod);
  }
}
