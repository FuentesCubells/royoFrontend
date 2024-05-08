import { Component, OnInit } from '@angular/core';
import { HermesService } from '../../../services/hermes/hermes-service.component';
import { Subscription, isEmpty } from 'rxjs';


export interface SubmitButton {
  [key: string]: any

  button: ButtonState;
  checkbox: CheckboxState;
  emptyFields: EmptyFields;
}

export interface ButtonState {
  isDisabled: boolean;
}

export interface CheckboxState {
  isChecked: boolean;
}

export interface EmptyFields {
  isEmpty: boolean;
}

@Component({
  selector: 'form-submit-button',
  standalone: true,
  imports: [],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {

  hermesSub: Subscription;
  state: SubmitButton = {
    button: { isDisabled: true },
    checkbox: { isChecked: false },
    emptyFields: { isEmpty: true }
  };

  constructor( private hermesService: HermesService  ){

    this.hermesSub = this.hermesService.getSubscription().subscribe( data => {
      if ( this.state.hasOwnProperty(data.id) ) {
        this.state[data.id].value = data.data;
        this.checkState()
      }
    });
  }

  checkState(){
    if ( this.state.checkbox ) {
      this.state.button.isDisabled = !this.state.button.isDisabled;
    }
  }

  onSubmit() {
    this.hermesService.sentFormData('isSubmitted', true);
  }

  ngOnDestroy(): void {
    this.hermesSub.unsubscribe();
  }
}
