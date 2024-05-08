import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HermesService {
  private subject = new Subject<any>();

  getSubscription() {
    return this.subject.asObservable();
  }

  sent( data: any){
    this.subject.next(data);
  }

  sentFormData( id: string, data: any){
    const formData = {
      id,
      data
    }

    this.subject.next( formData );
  }
}
