import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  cartId:string | null = '';

  orders:FormGroup = this._FormBuilder.group({
    details:[null],
    phone:[null],
    city:[null],
  })

    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.cartId = params.get('id');
          console.log(this.cartId)
        }
      })
      
    }

     orderSubmit():void{
      console.log(this.orders.value);
      this._OrdersService.checkOut(this.cartId ,this.orders.value ).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status == "success"){
             res.session.url     // url stripe //
            window.open(  res.session.url , '_self')
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
}
