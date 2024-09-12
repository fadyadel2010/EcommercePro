import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SalePipe } from '../../Core/pipes/sale.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,SalePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  Productlist:Iproduct[] = []

  ngOnInit(): void {
    
    this._ProductsService.GetAllProduct().subscribe({
      next:(res)=>{
        this.Productlist = res.data

      },
      error:(res)=>{

      }
    })

  }

  AddToCart(id:string):void{

    this._CartService.GetProductToCart(id).subscribe({
      next:(res)=>{

        this._ToastrService.success( res.message)

      },
      error:(err)=>{

        this._ToastrService.success( err.message)


      }
    })
  }

  AddToWishlist(id:string):void{
    this._ProductsService.AddToWishlist(id).subscribe({
      next:(res)=>{

        console.log(res)
        this._ToastrService.success( res.message)

      },
      error:(err)=>{

        console.log(err)
        this._ToastrService.success( err.message)


      }
    })
  }

}
