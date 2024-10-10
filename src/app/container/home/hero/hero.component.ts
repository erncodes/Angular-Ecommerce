import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  ShopNow(){
    var bottom = document.getElementById("bottom-container")?.getBoundingClientRect().bottom;
    if(bottom){
      if(screen.width <= 573){
        bottom += 50;
      }
      else if(screen.width > 573 && screen.width <= 575){
        bottom += 90;
      }
      else if(screen.width > 575){
        bottom += 205;
      }
      scrollTo({top:bottom,left:0,behavior: 'smooth'});
    }
  }
}
