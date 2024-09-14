import { Component } from '@angular/core';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-main-header',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent {
  faShoppingBag = faShoppingBag;
  faUser = faUser;

  ToggleNav(){
    let canvasDiv = document.getElementById("navbarsExampleDefault"); 
    if(canvasDiv != null){
      canvasDiv.classList.toggle('open');
    }
  }
}
