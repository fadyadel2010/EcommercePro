import { Component, NgModule, OnInit, inject } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { CartInterface } from '../../Core/interfaces/cart-interface';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule , RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productCart : CartInterface = {} as CartInterface; 


  ngOnInit(): void {
    this.ShowProductsInCart()
  }

  ShowProductsInCart():void{

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

  DeleteOneProduct(id:string):void{

    this._CartService.RemoveSpecificProduct(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.status)
        this.ShowProductsInCart();

      },
      error:(err)=>{
        this._ToastrService.error(err.status)

      }
    })
  }

  UpdateProductCount(id:string , mycount:number):void
  {
    this._CartService.CountProductUpdate(id , mycount).subscribe({
      next:(res)=>{
        if(res.count == 0){
          this.DeleteOneProduct(id)
        }

        console.log(res)
        this.ShowProductsInCart()

      },
      error:(err)=>{
        console.log(err)

      }
    })
  }

  ClearAllProduct():void{
    this._CartService.ClearCart().subscribe({
      next:(res)=>{

        this._ToastrService.success(res.message)

        this.ShowProductsInCart()


      },
      error:(err)=>{
        this._ToastrService.error(err.message)
      }
    })
  }



  

  }


