import { Component, OnDestroy } from '@angular/core';
import { InputComponent } from './input/input.component';
import { Form, FormField } from './models.component';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { Subscription } from 'rxjs';

import { HermesService } from '../../services/hermes/hermes-service.component';
import { MongoDb } from '../../services/database/mysql-service/mongodb-service.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, InputComponent, CheckboxComponent, SubmitButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnDestroy {
  private hermesSub: Subscription;

  inputs: Form = {

    form: {
      nombre: {
        placeholder: 'Santiago Nasar',
        error: 'Por favor introduce un texto válido',
        value: ''
      },
      email: {
        placeholder: 'ejemplo@gmail.com',
        error: 'Por favor introduce un email válido',
        value: '',
      },
      telefono: {
        placeholder: '678 983 234',
        error: 'Por favor introduce un teléfono válido',
        value: '',
      }
    },
    checkbox: {
      value: false
    },
    isSubmitted: {
      value: false
    },
    errors: {
      showError: false,
      message: 'Porfavor comprueba todos los campos'
    }
  }

  constructor(private hermesService: HermesService, private mongoService: MongoDb) {
    this.hermesSub = this.hermesService.getSubscription().subscribe(data => {
      if (this.inputs.form.hasOwnProperty(data.id)) {
        this.inputs.form[data.id].value = data.data;
      }

      if (this.inputs.hasOwnProperty(data.id)) {
        this.inputs[data.id].value = data.data;
        this.checkFormIsReady();
      }
    });
  }
  get formKeys(): string[] {
    return Object.keys(this.inputs.form);
  }

  checkFormIsReady(): boolean {
    if (this.inputs.isSubmitted.value) {

      for (const key of Object.keys(this.inputs.form)) {
        if (!this.inputs.form[key].value) {
          this.inputs.errors.showError = true;
          this.hermesService.sentFormData('emptyFields', true);
          return false;
        }
      }
      this.inputs.errors.showError = false;
      this.onSubmit()
      return true
    }

    return false
  }

  onSubmit() {

    this.mongoService.postLeads( this.prepareRequest() ).subscribe(
      
      (response) => {
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        console.error('Error al enviar los datos:', error);
      }
    );
    
  }

  prepareRequest() {
    const { nombre, email, telefono } = this.inputs.form;

    const request = {
      nombre: nombre.value,
      email: email.value,
      telf: telefono.value
    };

    return request;
  }

  ngOnDestroy(): void {
    this.hermesSub.unsubscribe();
  }

}
