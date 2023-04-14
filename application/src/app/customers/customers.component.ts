import { Component } from '@angular/core';
import { Customer } from '../Customer';
import { DataService } from '../data.service';
import { CustomerService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  title = 'Customer.UI';
  customers: Customer[] = [];
  heroToEdit?: Customer;

  constructor(private svc: CustomerService) { }

  ngOnInit(): void {
    this.svc
      .getData()
      .subscribe((result: Customer[]) => {
        console.log(result);
        this.customers = result
      });
  }

  deleteCustomer(customerName: string) {
    this.svc.deleteCustomer(customerName).subscribe(() => {
      // Оновити список клієнтів після видалення
      this.customers = this.customers.filter(customer => customer.name !== customerName);
    });
  }
  
  

}
