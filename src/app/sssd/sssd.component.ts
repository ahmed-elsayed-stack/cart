import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-sssd',
  standalone: true,
  imports: [],
  templateUrl: './sssd.component.html',
  styleUrl: './sssd.component.scss'
})
export class SssdComponent {

  data:InputSignal<string> = input.required();
  ngOnInit(): void {
    console.log(this.data())
    
  }

}
