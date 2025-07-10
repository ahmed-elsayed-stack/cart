import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink , CommonModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  
  





  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  cartDetails:Icart = {} as Icart;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }

    removeItem(id:string):void{

       Swal.fire({
      title: 'Are You Sure?',
      text: 'You will not be able to undo after deletion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
         this._CartService.deleteSpecificCartItem(id).subscribe({
        next:(res)=>{
          console.log(res);
           this.cartDetails = res.data;
           this._CartService.cartNumber.set(res.numOfCartItems)
             // نفّذ الحذف هنا
        console.log(`تم حذف العنصر ذو المعرف ${id}`);
          Swal.fire('Deleted!', 'The item has been deleted successfully', 'success');
        
           
        },
          error:(err)=>{
          console.log(err)
       

        }
      
      });
      
      }
    });

     
    }

    updateCount(id:string ,count:number ):void
    {
      if(count > 0){
        this._CartService.updateProductCuantity(id , count).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartDetails = res.data;

        },
        error:(err)=>{
          console.log(err)
        }
      })
      }
    }

    clearItems(): void {
  Swal.fire({
    title: 'Are You Sure?',
    text: "All items will be removed from the cart!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: "Yes, delete all",
    cancelButtonText: 'cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this._CartService.clearCart().subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "success") {
            this.cartDetails = {} as Icart;
            this._CartService.cartNumber.set(0)

            // ممكن تضيف رسالة نجاح هنا لو حبيت
            Swal.fire('Deleted!', 'تم حذف كل العناصر من السلة.', 'success');
          }
        },
        error: (err) => {
          console.log(err);
          Swal.fire("error" , "All items have been removed from the cart.", 'error');
        }
      });
    }
  });
}

    
}
