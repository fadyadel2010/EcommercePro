import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);
  mytoken:any = {token : localStorage.getItem('UserToken')} 
  GetProductToCart(id:string):Observable<any>{

    return this._HttpClient.post(`${enviroments.baseurl}/api/v1/cart` ,

    {
      "productId": id
    },

    {

       headers : this.mytoken
    }
    
    )
  }

  GetAllProductCart():Observable<any>{

    return this._HttpClient.get(`${enviroments.baseurl}/api/v1/cart` ,

    {
      headers: this.mytoken
    }
    
    )
  }

  RemoveSpecificProduct(id:string):Observable<any>
  {
    return this._HttpClient.delete(`${enviroments.baseurl}/api/v1/cart/${id}`,
    {
      headers:this.mytoken
    })
  }

  CountProductUpdate(id:string , newcount:number):Observable<any>{
    return this._HttpClient.put(`${enviroments.baseurl}/api/v1/cart/${id}`,
    {
      "count" : newcount
    },
    {
      headers: this.mytoken
    })
  }

  ClearCart():Observable<any>{
    return this._HttpClient.delete(`${enviroments.baseurl}/api/v1/cart` ,
    {
      headers: this.mytoken
    })
  }

  CashOrder(details:object , id:string):Observable<any>
  {
    return this._HttpClient.post(`${enviroments.baseurl}/api/v1/orders/${id}`,
    {
      body:details
    },
    {
      headers: this.mytoken
    })
  }

  VisaOrder(details:object , id:string):Observable<any>{

    return this._HttpClient.post(`${enviroments.baseurl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` 
    ,
    {
      body: details
    },
    {
      headers: this.mytoken
    })
  }

  ExtractUserData(id:string):Observable<any>
  {
    return this._HttpClient.get(`${enviroments.baseurl}/api/v1/orders/user/${id}`)
  }

}
