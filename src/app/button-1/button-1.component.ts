import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-1',
  templateUrl: './button-1.component.html',
  styleUrls: ['./button-1.component.css']
})
export class Button1Component {
  @Input() text : string = '';
}
