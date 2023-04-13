import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Customer } from './Customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
