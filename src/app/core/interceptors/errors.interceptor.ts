import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

    const _ToastrService = inject(ToastrService);

  return next(req).pipe(catchError((err)=>{

    console.log (  'interceptors' , err.error.message)

    _ToastrService.error(err.error.message , 'Fresh Cart')

    return throwError(()=>err)
  })) ;
};
