import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  

  
    private readonly  _AuthService= inject(AuthService);
    private readonly  _FormBuilder= inject(FormBuilder);
    private readonly  _Router= inject(Router);
    registerSup!:Subscription

    msgError:string = '';
    isLoading:boolean = false;
    msgSuccess:boolean = false;

    dataForm = {
      name: 'Ahmed Elsayed osman',
      email: 'ae94856@gmail.com',
      phone: '01091072539',
      password: '102030',
      repassword: '102030',
    }
    ngOnInit(): void {
      this.registerForm.patchValue({
        name:this.dataForm.name,
        email:this.dataForm.email,
        phone:this.dataForm.phone,
        password:this.dataForm.password,
        repassword:this.dataForm.repassword,
      })
      
    }


    registerForm:FormGroup = this._FormBuilder.group({
      name:[null, [Validators.required , Validators.minLength(3), Validators.maxLength(20)] ],
      email:[null, [Validators.required , Validators.email]],
      phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)] ],
      password:[null ,  [Validators.required , Validators.pattern(/^\w{6,}$/)]],
      rePassword:[null, ],
    } , {validators:this.confirmPassward})  

  
    // registerForm:FormGroup = new FormGroup({
    //   name:new FormControl(null, [Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
    //   email:new FormControl(null , [Validators.required , Validators.email]),
    //   password:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    //   rePassword:new FormControl(null),
    //   phone:new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
    // } , this.confirmPassward )



    registerSubmit():void{

      if(this.registerForm.valid){
        this.isLoading = true;

      this.registerSup = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
          next:(res)=>{
            console.log(res)
            if(res.message == "success"){
              
              this.msgSuccess = true;
            setTimeout(() => {


              this._Router.navigate(['/login'])
            }, 2000);
            }
            this.isLoading = false;

          },
          error:(err:HttpErrorResponse)=>{
            this.msgError = err.error.message
            console.log(err)
            this.isLoading = false;

          }
          
        })
      }else{
        this.registerForm.setErrors({mismatch:true})
        this.registerForm.markAllAsTouched()
      }
    }
    ngOnDestroy(): void {
      this.registerSup?.unsubscribe()
      
    }

      
    confirmPassward( g:AbstractControl){
      if(g.get('password')?.value === g.get('rePassword')?.value ){
       return null
      }else{
       return{mismatch:true}
      }
   }
   


}
