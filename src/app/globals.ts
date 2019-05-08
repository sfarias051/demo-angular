import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    //server:string = 'http://localhost:8080';
    server:string = 'https://demo-sb-mongo.herokuapp.com';
    apiGetEmployees:string = '/employees/';
    apiGetEmployee:string = '/employees/';
    apiSaveEmployee:string = '/employees';
    apiUpdateEmployee:string = '/employees/';

    alertUpdateEmployee:string = 'Update this employee?'
}