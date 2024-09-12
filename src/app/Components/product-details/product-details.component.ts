import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/services/products.service';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartInterface } from '../../Core/interfaces/cart-interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService= inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productCart : CartInterface = {} as CartInterface; 


  ProductDara: Iproduct | null = null;
  MainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay : true,
    navSpeed: 1000,
    navText: ['', ''],
    items:1,
  }




  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p) =>{

        let productid = p.get('id');

         this._ProductsService.GetOneProduct(productid).subscribe({
          next:(res)=>{

            console.log(res)
            this.ProductDara = res.data

          },

          error:(err)=>{

          }
         })

      }
    })
    
  }

  producttocart(id:string):void
  {
    this._CartService.GetProductToCart(id).subscribe({
      next:(res)=>{
      this._ToastrService.success( res.message)
      },

      error:(err)=>{
        this._ToastrService.error( err.message)

      }
    })
  }

  AddtoWishList(id:string):void{
    this._ProductsService.AddToWishlist(id).subscribe({
      next:(res)=>{
        this._ToastrService.success( res.message)
      },
      error:(err)=>{
        this._ToastrService.error( err.message)

      }
    })
  }

}
