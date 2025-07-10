import { throwError } from 'rxjs';
import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  counter:WritableSignal<number> = signal(0);
  userName:WritableSignal<string> = signal('Ali mohamed')

  changeCounter():void{
    this.counter.update( (value)=> value + 1 )
  }

  changeUserName():void{
    this.userName.set( 'Ahmed Elsayed')
  }

  price:WritableSignal<number> = signal(20);
  quantity:WritableSignal<number> = signal(10);

  totalPrice:Signal<number> = computed( ()=> this.price() * this.quantity() );

  changePrice():void{
    this.price.set(30);
  }

}


