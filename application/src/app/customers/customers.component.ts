import { Component } from '@angular/core';
import { Customer } from '../Customer';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  title = 'Customer.UI';
  customers: Customer[] = [];
  heroToEdit?: Customer;

  constructor(private svc: DataService) { }

  ngOnInit(): void {
    this.svc
      .getData()
      .subscribe((result: Customer[]) => {
        console.log(result);
        this.customers = result
      });
  }
}
