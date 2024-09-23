import { Component, inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.services';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  faHeart = faHeart;
  prodService = inject(ProductService);
  products  = this.prodService.getAllproducts();
  router : Router = inject(Router);

  MyMethod(prod : any){
    this.prodService.ViewProduct(prod);
    this.router.navigate(['Home','Product-view']);
  }

}
