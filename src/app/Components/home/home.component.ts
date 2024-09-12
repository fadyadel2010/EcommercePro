import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { CategoriesService } from '../../Core/services/categories.service';
import { Icategory } from '../../Core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../Core/pipes/termtext.pipe';
import { SalePipe } from '../../Core/pipes/sale.pipe';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,TermtextPipe,SalePipe,SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  ProductList:Iproduct[] = []  
  CategoreList:Icategory[] = []
  SearchText:string = "";

  CategoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay : true,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }


  MainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay : true,
    navSpeed: 1000,
    navText: ['', ''],
    items:1,
    nav: true
  }

  ngOnInit(): void {
    this.GetProducts()
    this.getCategories()
  }

  GetProducts():void{
    this._ProductsService.GetAllProduct().subscribe({
      next:(res)=>{
         console.log(res.data)
         this.ProductList = res.data;
      },
      error:(err) =>{
        console.log(err);
      }
    })
  }

  getCategories():void{
    this._CategoriesService.GetAllCategoires().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.CategoreList = res.data;
      },
      error:(err)=>{
        console.log(err);
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



}
