import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpclint = inject(HttpClient);
  private readonly _Router = inject(Router);
  UserData:any = null;


  GetRegisterForm(data:object ):Observable<any>
  {
   return this._httpclint.post(`${enviroments.baseurl}/api/v1/auth/signup` , data)
  }

  GetLoginForm(data:Object ):Observable<any>
  {
   return this._httpclint.post(`${enviroments.baseurl}/api/v1/auth/signin` , data)
  }

  GetUserData():void{
    if(localStorage.getItem('UserToken') !== null)
    {
      const token = JSON.stringify(localStorage.getItem('UserToken'))
      const decode =jwtDecode(token)
     this.UserData = decode

    }

    this.UserData.id

  }

  ForgetPassword(data:object):Observable<any>{
   return  this._httpclint.post(`${enviroments.baseurl}/api/v1/auth/forgotPasswords` , data)
  }

  VerifyCodes(data:object):Observable<any>
  {
    return this._httpclint.post(`${enviroments.baseurl}/api/v1/auth/verifyResetCode` , data)
  }

  NewPasswords(data:object):Observable<any>
  {
    return this._httpclint.post(`${enviroments.baseurl}/api/v1/users/changeMyPassword` , data)
  }

  LogOut():void{
    localStorage.removeItem('UserToken');
    this.UserData = null;
    this._Router.navigate(['/login']);
  }
}
