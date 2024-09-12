import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient)
  mytoken:any = {token : localStorage.getItem('UserToken')}

  GetAllProduct():Observable<any>
  {
   return this._HttpClient.get(`${enviroments.baseurl}/api/v1/products`)
  }

  GetOneProduct(id:string|null):Observable<any>
  {
    return this._HttpClient.get(`${enviroments.baseurl}/api/v1/products/${id}`)
  }

  AddToWishlist(id:string):Observable<any>
  {
    return this._HttpClient.post(`${enviroments.baseurl}/api/v1/wishlist` ,
    {
      "productId": id
    },
    {
      headers:this.mytoken
    })
  }

  GetWishlistProducts():Observable<any>{
    return this._HttpClient.get(`${enviroments.baseurl}/api/v1/wishlist/` ,
    {
      headers : this.mytoken
    })
  }

  RemoveFromWishlist(id:string):Observable<any>{

    return this._HttpClient.delete(`${enviroments.baseurl}/api/v1/wishlist/${id}`,
    {
      headers: this.mytoken
    })
  }

}
