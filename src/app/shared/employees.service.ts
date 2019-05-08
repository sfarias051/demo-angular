import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

import { Globals } from '../globals';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient, private globals: Globals){}
  
  httpHeaders = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  } 

  getAllEmployees(): Observable<Employee>{
    return this.http.get<any>(
        this.globals.server + this.globals.apiGetEmployees
      ).pipe(retry(1),catchError(this.handleError));
  }

  getEmployee(id): Observable<Employee>{
    return this.http.get<Employee>(
        this.globals.server + 
        this.globals.apiGetEmployee + id
      ).pipe(retry(1), catchError(this.handleError))
  }
  
  createEmployee(employee): Observable<Employee>{
    return this.http.post<Employee>(
        this.globals.server + this.globals.apiSaveEmployee,
        JSON.stringify(employee),
        this.httpHeaders
      ).pipe(retry(1), catchError(this.handleError))
  }

  updateEmployee(id,employee): Observable<Employee>{
    return this.http.put<Employee>(
        this.globals.server + this.globals.apiUpdateEmployee + id,
        JSON.stringify(employee),
        this.httpHeaders
      ).pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
   
}
