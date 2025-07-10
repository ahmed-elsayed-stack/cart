import { RouterLink } from '@angular/router';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, DatePipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe,  } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, FormsModule , TermtextPipe , SearchPipe , SalePipe ,  UpperCasePipe, LowerCasePipe , TitleCasePipe , CurrencyPipe , SlicePipe , DatePipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    private readonly _ProductsService = inject(ProductsService);
    private readonly _CategoriesService = inject(CategoriesService);
    private readonly _CartService = inject(CartService);
    private readonly _ToastrService = inject(ToastrService);
    private readonly _NgxSpinnerService = inject(NgxSpinnerService);

    // productsList:iproduct[] = [];
    productsList:WritableSignal<iproduct[]> = signal([]);
    // categoriesList:Icategory[] = [];
    categoriesList:WritableSignal<Icategory[]> = signal([]);
    getAllProductSup!:Subscription;


    text:string = ''


    customOptionsMain: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      rtl:true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true, 
      navSpeed: 700,
      navText: ['', ''],
      items:1,
      nav: false
    }

    customOptionsCat: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      rtl:true,
      dots: true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true, 
      navSpeed: 700,
      navText: ['prev', 'next'],
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
          items: 6
        }
      },
      nav: true
    }


      ngOnInit(): void {
        this._NgxSpinnerService.show('loading-2');

        this._CategoriesService.getAllCategories().subscribe({
          next:(res)=>{
            console.log(res.data);
            this.categoriesList.set(res.data)

            this._NgxSpinnerService.hide('loading-2');

          },
          error:(err)=>{
            console.log(err)
          }
        })

        this.getAllProductSup = this._ProductsService.getAllProducts().subscribe({
            next:(res)=>{
              console.log(res.data)
              this.productsList.set(res.data)
            },
            error:(err)=>{
              console.log(err)
            }
          })
      }
      ngOnDestroy(): void {
       this.getAllProductSup?.unsubscribe()
        
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
