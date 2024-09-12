import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { CartInterface } from '../../Core/interfaces/cart-interface';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink ,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent  implements OnInit{
  private readonly _CartService = inject(CartService);
  productCart : CartInterface = {} as CartInterface;
  project!:boolean ;

  OrderDetails:FormGroup = new FormGroup({
    details:new FormControl(null , [Validators.required]),
    phone:new FormControl(null , [Validators.required]),
    city:new FormControl(null , [Validators.required])
  })

  PaymentChecked:FormGroup = new FormGroup({
    Cash:new FormControl(null ),
    
  })

  ngOnInit(): void {
    this.GetProducts();
  }


  GetProducts():void{
    this._CartService.GetAllProductCart().subscribe({
      next:(res)=>{

        console.log(res)
        this.productCart = res.data

      },
      error:(err)=>{

        console.log(err)


      }
    })
  }

  AcceptCashOrder(id:string):void{
    this._CartService.CashOrder(this.OrderDetails.value , id).subscribe({
      next:(res)=>{
        console.log(res)

      },
      error:(err)=>{
        console.log(err)

      }
    })
  }

  AcceptVisaOrder(id:string):void{

    this._CartService.VisaOrder(this.OrderDetails.value , id).subscribe({
      next:(res)=>{

        window.location.replace(res.session.url);
        console.log(res)

      },
      error:(err)=>{

        console.log(err)
      }
    })
  }

}
