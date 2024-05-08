import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HermesService } from '../../../services/hermes/hermes-service.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'form-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  hermesSub?: Subscription;
  isChecked: boolean = false;

  constructor( private hermesService: HermesService  ){
    this.hermesSub = this.hermesService.getSubscription().subscribe( data => {});
  }
  
  handleChecked(){
    this.isChecked = !this.isChecked;
    this.hermesService.sentFormData('checkbox', this.isChecked)
  }
}
