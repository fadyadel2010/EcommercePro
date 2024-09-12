import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private  _AuthService =inject (AuthService);
  private readonly _Router = inject(Router)
  isloading:boolean = false;
  SpinnerLoading:boolean = false;
  errormsg:string = "";

  LoginForm:FormGroup = new FormGroup({
   email:new FormControl(null , [Validators.required , Validators.email]),
   password:new FormControl(null , Validators.required)
  })

  loginsubmint():void
  {
    this.isloading = true;
   this.SpinnerLoading = true

    this._AuthService.GetLoginForm(this.LoginForm.value).subscribe( {
      next:(res)=>{
        
        console.log(res);
        this.isloading=false;
        this.SpinnerLoading = false
        localStorage.setItem('UserToken' , res.token )
        this._AuthService.GetUserData();
        this._Router.navigate(['/home'])
      },

      error:(err) =>{
        this.errormsg = err.error.message;
        this.isloading=false;
        this.SpinnerLoading = false;
      
      }

    })
  }


}
