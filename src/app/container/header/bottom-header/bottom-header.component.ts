import { Component, inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'bottom-header',
  templateUrl: './bottom-header.component.html',
  styleUrls: ['./bottom-header.component.css']
})
export class BottomHeaderComponent {
  prodService : ProductService = inject(ProductService);
  
  FilterProds(filterText :string){
    this.prodService.GetProductsFiltered(filterText);
  }
}
