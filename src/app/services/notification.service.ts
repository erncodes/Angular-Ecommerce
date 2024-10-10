import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  snackBar : MatSnackBar = inject(MatSnackBar);

  ShowNotification(displayMessage : string){
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
    this.snackBar.open("added to cart","close",
      {
        duration :2000,  
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: ['custom-snackbar', 'snackbar-success'],
    });
  }

}
