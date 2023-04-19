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
        return this.http.get<Customer[]>('https://localhost:7274/api/customers');
    }

    public deleteCustomer(name: string): Observable<void> {
        const url = `https://localhost:7274/api/customers/${name}`;
        return this.http.delete<void>(url);
    }

    public getCustomerByName(name: string) {
        return this.http.get<Customer>(`https://localhost:7274/api/customers/${name}`);
    }

    searchCustomers(searchTerm: string, pageSize: number, pageIndex: number, sortColumn: string, sortOrder: string) {
        return this.http.get<any[]>(
            `https://localhost:7274/api/customers?searchTerm=${searchTerm}&pageSize=${pageSize}&pageIndex=${pageIndex}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`
        );
    }

    public updateCustomer(name: string, customer: Customer) {
        return this.http.put(`https://localhost:7274/api/customers/${name}`, customer);
    }

    public createCustomer(customer: Customer) {
        return this.http.post(`https://localhost:7274/api/customers`, customer);
    }
}
