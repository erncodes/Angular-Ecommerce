import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search-combo.component.html',
  styleUrls: ['./search-combo.component.css']
})
export class SearchComboComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  searchMode : boolean = true;

  ToggleSearch(){
    this.searchMode = !this.searchMode
  }
}
