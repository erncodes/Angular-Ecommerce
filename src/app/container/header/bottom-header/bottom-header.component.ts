import { ProductService } from 'src/app/services/product.services';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'bottom-header',
  templateUrl: './bottom-header.component.html',
  styleUrls: ['./bottom-header.component.css']
})
export class BottomHeaderComponent {
  filterText : string = '';

  prodService : ProductService = inject(ProductService);

  ngOnInit(){
    this.filterText = 'All';
    this.prodService.GetProductsFiltered('');
  }

  FilterProds(text :string)
  {
    this.filterText = text;
    this.prodService.GetProductsFiltered(text);
    var bottom = document.getElementById("bottom-container")?.getBoundingClientRect().bottom;
    if(bottom){
              if(screen.width <= 573)
                {
                  bottom += 50;
                }
                else if(screen.width > 573 && screen.width <= 575)
                {
                  bottom += 90;
                }
                else if(screen.width > 575)
                {
                  bottom += 205;
                }
                scrollTo({top:bottom,left:0,behavior: 'smooth'});
              }
  }
}
