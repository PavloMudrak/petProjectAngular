import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './Customer';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getData() {
        console.log("==================================")

        //return this.http.get('https://localhost:5153/api/customers');
        return this.http.get<Customer[]>('https://localhost:7274/api/customer');
    }


}
