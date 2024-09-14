import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  selectedProd : any;
  prodService : ProductService = inject(ProductService);

  ngOnInit(){
    this.prodService.productClicked.subscribe((prod)=>{
      this.selectedProd = prod;
    })
  }
}
