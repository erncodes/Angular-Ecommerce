import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../container/home/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  snackBar : MatSnackBar = inject(MatSnackBar);

  ShowNotification(displayMessage : string){
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    this.snackBar.openFromComponent(SnackbarComponent,
      {
        duration :2000,  
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        data:
        {
          message : displayMessage
      }});
  }

}
