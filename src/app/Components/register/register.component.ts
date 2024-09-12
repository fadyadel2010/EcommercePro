import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { log } from 'console';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  errormsg:string = "";
  isloading:boolean = false;
  SpinnerLoading:boolean = false;

  RegisterForm:FormGroup = new FormGroup({
    name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    rePassword:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])

  } , this.PasswordConfirm)

  PasswordConfirm(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value)
    {
      return null;
    }

    else
    {
      return {mismatch:true}
    }

  }

  SubminRegister():void{

    this.isloading = true;
      this.SpinnerLoading = true;
    if(this.RegisterForm.valid)
    {
     
      this._AuthService.GetRegisterForm(this.RegisterForm.value).subscribe(
        {
        next:(res)=>{
          console.log(res);
          this.isloading = false;
          this.SpinnerLoading = false;
          this._Router.navigate(['/login']);

        },
        

       error:(err)=>{
        this.errormsg = err.error.message;
        this.isloading=false;
        this.SpinnerLoading = false;

        
       }
        

      })
    }

  }
  

}
