import { Component, EventEmitter, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'bottom-header',
  templateUrl: './bottom-header.component.html',
  styleUrls: ['./bottom-header.component.css']
})
export class BottomHeaderComponent {
  prodService : ProductService = inject(ProductService);
  public filterText : string = '';
  ngOnInit(){
    this.filterText = 'Popular';
    this.prodService.GetProductsFiltered('Popular');
  }

  FilterProds(text :string){
    this.filterText = text;
    this.prodService.GetProductsFiltered(text);
  }
}
