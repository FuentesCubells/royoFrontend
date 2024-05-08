import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { ajax, AjaxResponse, AjaxError } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class MongoDb {

  postLeads(data: any): Observable<any> {
    return ajax.post('royopackbackend.railway.internal:3001/leads/new', data).pipe(

      catchError((error: AjaxError) => {
        console.error('Error al enviar los datos:', error);
        throw error; // Re-lanzar el error para que lo maneje el código cliente si es necesario
      })
      
    );
  }

}
