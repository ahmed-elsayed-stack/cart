import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

    private readonly _ActivatedRoute = inject(ActivatedRoute);
    private readonly _ProductsService = inject(ProductsService);
    private readonly _CartService = inject(CartService);
    private readonly _ToastrService = inject(ToastrService);

    detailsProduct:iproduct | null = null;

    ngOnInit(): void {
        this._ActivatedRoute.paramMap.subscribe({
          next:(p)=>{
            let idProduct = p.get('id')
            console.log(p.get('id'))

            this._ProductsService.getSpecificProducts( idProduct).subscribe({
              next:(res)=>{
                console.log(res.data)
                this.detailsProduct = res.data
              },
              error:(err)=>{
                console.log(err)
              }
            })
          }
        })
    }
     
    addCart(id:string ):void{
      this._CartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message , 'freash cart');
          this._CartService.cartNumber.set(res.numOfCartItems)
          console.log(  this._CartService.cartNumber())
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

}
