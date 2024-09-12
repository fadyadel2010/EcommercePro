import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/services/cart.service';
import { RouterLink } from '@angular/router';
import { Iwishlist } from '../../Core/interfaces/iwishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {



  private readonly _ProductsService = inject(ProductsService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService);


  ProductWishlistCount!: number 
  ProductsList:Iproduct[] = []

  ngOnInit(): void {
    this.GetProducts()
  }

  GetProducts():void{
    this._ProductsService.GetWishlistProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.ProductsList = res.data
        this.ProductWishlistCount = res.count

      },
      error:(err)=>{
        console.log(err)

      }
    })
  }

  RemoveProduct(id:string):void{
    this._ProductsService.RemoveFromWishlist(id).subscribe({
      next:(res)=>{
        this._ToastrService.show( res.message)
        this.GetProducts()


      },
      error:(err)=>{

        this._ToastrService.show( err.message)

      }
    })
  }

  AddToCart(id:string):void{
    this._CartService.GetProductToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success( res.message)
        this.RemoveProduct(id)
        this.GetProducts()

      },
      error:(err)=>{

        this._ToastrService.success( err.message)

      }
    })

  }

}
