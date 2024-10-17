import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResponsePayload } from 'src/app/models/authResponsePayload';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode : boolean = true;
  authObservable = new Observable<ResponsePayload>();
  
  authService : AuthService = inject(AuthService);
  notifyService : NotificationService = inject(NotificationService);

  SwitchMode(){
    this.isLoginMode = ! this.isLoginMode;
  }
  LoginOrSignUp(form : NgForm){
    const password = form.value.password;
    const email = form.value.email;
    if(this.isLoginMode){
      this.authObservable = this.authService.Login(email,password);
    }
    else{
      this.authObservable = this.authService.SignUp(email,password);
    }
    this.authObservable.subscribe({
      next : () => {},
      error : (error) => { this.notifyService.ShowErrorNotification(error) }
    })
    form.reset();
  }
}
