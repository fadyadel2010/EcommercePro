import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _HttpClient = inject(HttpClient)

  GetAllCategoires():Observable<any>{

   return this._HttpClient.get(`${enviroments.baseurl}/api/v1/categories`)
  }

  GetOneCategoire(id:string):Observable<any>{

    return this._HttpClient.get(`${enviroments.baseurl}/api/v1/categories/${id}`)
   }

}
