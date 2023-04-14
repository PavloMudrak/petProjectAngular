import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../Customer';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get<Customer[]>('https://localhost:7274/api/customer');
    }

    public deleteCustomer(name: string): Observable<void> {
        const url = `https://localhost:7274/api/customer/${name}`;
        return this.http.delete<void>(url);
    }

    searchCustomers(searchTerm: string, pageSize: number, pageIndex: number) {
        return this.http.get<Customer[]>(`https://localhost:7274/api/customer/search?searchTerm=${searchTerm}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    }

    getPagesCount(searchTerm: string, pageSize: number, pageIndex: number) {
        return this.http.get<number>(`https://localhost:7274/api/customer/pages?searchTerm=${searchTerm}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    }

}
