import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _TranslateService = inject(TranslateService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  constructor() { 

    if(isPlatformBrowser(this._PLATFORM_ID)){
       // logic

   

    // 2-setDefault lang
    this._TranslateService.setDefaultLang('en');

  

  this.setLang()
  
    }


   
  }

 setLang(): void {

  let savedLang = localStorage.getItem('lang');
    // 3-use lang
     if(savedLang !== null){
      this._TranslateService.use( savedLang !);
    }
  if (savedLang === 'en') {
    document.documentElement.dir = 'ltr';
  } else if (savedLang === 'ar') {
    document.documentElement.dir = 'rtl';
  }
}

  changLang(lang:string):void{
    if(isPlatformBrowser(this._PLATFORM_ID)){
       localStorage.setItem('lang' , lang);
      this.setLang()
    }
  }

}
