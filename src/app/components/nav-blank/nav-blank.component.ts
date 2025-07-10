import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

   readonly   _AuthService = inject(AuthService);
   readonly   _TranslateService = inject(TranslateService);
   private  readonly _MyTranslateService = inject(MyTranslateService);
   private  readonly _CartService = inject(CartService);

  countNumber: Signal<number> = computed(  ()=> this._CartService.cartNumber()  )

  ngOnInit(): void {

    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log(  'cartIrems' ,  res);
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })

    
  }


  change(lang:string):void{
    this._MyTranslateService.changLang(lang);
     

  }
}
