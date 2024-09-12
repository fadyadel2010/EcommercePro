import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router)
  errormsg:string = "";
  isloading:boolean = false
  SpinnerLoading:boolean = false
  step:number = 1;

  verifyemail:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email])
  })

  verifycode:FormGroup = new FormGroup({
    resetCode: new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)])
  })

  RestPassword:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    newPassword:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)])
  })

  forgot():void{

    this.isloading = true;
    this.SpinnerLoading = true
    let emailto = this.verifyemail.get('email')?.value;
    this.RestPassword.get('email')?.patchValue(emailto)
    this._AuthService.ForgetPassword(this.verifyemail.value).subscribe({
      next:(res)=>{

        this.isloading = false;
        this.SpinnerLoading= false;
        this.step = 2;


      },

      error:(err)=>{
        this.errormsg = err.message
        this.isloading = false;
        this.SpinnerLoading = false;


      }
    })
  }

  VerifyEmailSubmin():void
  {

    this.isloading = true;
    this.SpinnerLoading = true
    this._AuthService.VerifyCodes(this.verifycode.value).subscribe({
      next:(res)=>{

        this.isloading = false;
        this.SpinnerLoading= false;
        this.step = 3;

      },
      error:(err)=>{
        this.errormsg = err.message 
        this.isloading = false;
        this.SpinnerLoading = false;
      }
    })

  }

  NewPasswordSubmit():void{
    this.isloading = true;
    this.SpinnerLoading = true
    this._AuthService.NewPasswords(this.RestPassword.value).subscribe({
      next:(res)=>{

        this.isloading = false;
        this.SpinnerLoading= false;
        localStorage.setItem('UserToken' , res.token)
        this._AuthService.GetUserData()
        this._Router.navigate(['/home'])
      },
      error:(err)=>{

        this.errormsg = err.message
        this.isloading = false;
        this.SpinnerLoading= false;
      }
    })


  }

}
