import { Component, Input, OnDestroy } from '@angular/core';
import { FormField } from '../models.component';
import { CommonModule } from '@angular/common';
import { HermesService } from '../../../services/hermes/hermes-service.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'form-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})

export class InputComponent implements OnDestroy {

  private hermesSub: Subscription;

  @Input() fieldName: string = '';
  @Input() field?: FormField;
  inputValue: string = '';
  showError: boolean = false;

  constructor( private hermesService: HermesService  ){
    this.hermesSub = this.hermesService.getSubscription().subscribe();
  }

  handleInputChange( event: Event, type?: string){

    if (event.target instanceof HTMLInputElement) {
      this.inputValue = event.target.value;
      this.checkErrors( this.fieldName );
    }

  }
  
  checkErrors( fieldName: string ): void {

      switch(fieldName) {
        case 'nombre':
          if( this.checkName(this.inputValue) ) {
            this.showError = false;
            this.hermesService.sentFormData(fieldName, this.inputValue);
          } else {
            this.showError = true;
          };

          break;
          
        case 'email':
          if( this.checkEmail(this.inputValue) || this.inputValue.length < 3 ) {
            this.showError = false;
            this.hermesService.sentFormData(fieldName, this.inputValue);
          } else {
            this.showError = true;
          };
         
          break;

        case 'telefono':
          if( this.checkPhone( this.inputValue ) || this.inputValue.length < 3 ) {
            this.showError = false;
            this.hermesService.sentFormData(fieldName, this.inputValue);
          } else {
            this.showError = true;
          };

          break;
          
        default:
          console.log("Campo no reconocido: " + fieldName);
      }
    
  }
  
  checkName( name: string ): boolean {
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    const isValidName = nameRegex.test(name);
   
    return isValidName
  }

  checkEmail( email: string ): boolean {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(this.inputValue);
    
    return isValidEmail
  }

  checkPhone(phone: string): boolean {
    
    const cleanedPhone = phone.replace(/\D/g, '');
    this.parsePhone(cleanedPhone);
    const isValidPhone = /^\d{9}$/.test(cleanedPhone);
  
    return isValidPhone;
  }

  parsePhone(phone: string) {
    const formattedPhone = phone.replace(/(\d{3})(?=\d)/g, '$1 ');
    this.inputValue = formattedPhone;
  }

  ngOnDestroy(): void {
    this.hermesSub.unsubscribe();
  }
}
