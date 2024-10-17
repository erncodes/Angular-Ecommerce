import { User } from '../models/user';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { ResponsePayload } from '../models/authResponsePayload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient : HttpClient = inject(HttpClient);
  userSubject = new BehaviorSubject<User | undefined>(undefined);

  SignUp(email:string,password:string){
    const data = { email : email,password : password, returnSecureToken : true};
    return this.httpClient.post<ResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxWQC_YDo2bjmPRT-ygXvA5U7W09LViEs',data).
    pipe(catchError(this.HandleError),tap(this.HandleUserCreate));
  }
  Login(email:string,password:string){
    const data = { email : email,password : password, returnSecureToken : true};
    return this.httpClient.post<ResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxWQC_YDo2bjmPRT-ygXvA5U7W09LViEs',data).
    pipe(catchError(this.HandleError),tap(this.HandleUserCreate));
  }
  HandleUserCreate(res : ResponsePayload){
      const ResExpiresIn = new Date().getTime() + +res.expiresIn * 1000;
      const ResConvert = new Date(ResExpiresIn);
      const user = new User(res.email, res.localId, res.idToken, ResConvert);
      this.userSubject.next(user);
  }
  private HandleError(err : HttpErrorResponse){
    let errorMsg = 'Unknown error has occured';
      if(!err.error || !err.error.error){
        return throwError(()=>errorMsg);
      }
      switch(err.error.error.message){
        case 'EMAIL EXISTS':
          errorMsg = 'User with this email already exists!';
          break;
          case 'OPERATION_NOT_ALLOWED':
          errorMsg = 'This operation is not allowed!';
          break;
        case 'INVALID_LOGIN-CREDENTIALS':
          errorMsg = 'Email or password incorrect!';
          break;
          default:
          errorMsg = 'Unknown error had occured!';
          break;
      }
      return throwError(()=>errorMsg);
  }
}
