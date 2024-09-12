import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../Core/services/auth.service';
import { CartService } from '../../Core/services/cart.service';
import { UserOrders } from '../../Core/interfaces/user-orders';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  private readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)
  userid!:string;
  AllProduct : UserOrders = {} as UserOrders; 
  ngOnInit(): void {

    this._AuthService.GetUserData()
    this.DecodeUserData()
  }

  DecodeUserData():void{

    this._CartService.ExtractUserData(this._AuthService.UserData.id).subscribe({
      next:(res)=>{

        console.log(res)

        this.AllProduct = res
        
      },
      error:(err)=>{

        console.log(err)

      }
    })
  }

 


}
