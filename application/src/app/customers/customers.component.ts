import { Component } from '@angular/core';
import { Customer } from '../Customer';
import { DataService } from '../data.service';
import { CustomerService } from './customers.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [
    trigger('transitionMessages', [
      // Опис анімації тут...
    ])
  ]
})
export class CustomersComponent {
  title = 'Customer.UI';
  customers: Customer[] = [];
  allCustomers: Customer[] = [];
  heroToEdit?: Customer;
  searchTerm: string = '';

  filteredCustomers: Customer[] = [];
  pageSizeOptions: number[] = [5, 10, 14];
  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 0;

  constructor(private svc: CustomerService) { }

  ngOnInit() {
    this.svc
      .getFirstPage(this.pageSize)
      .subscribe((result: Customer[]) => {
        this.filteredCustomers = result;
        console.log(this.filteredCustomers)
      });
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.pageIndex = 0;
    this.filterCustomers(searchTerm);
  }


  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.svc.searchCustomers(this.searchTerm, this.pageSize).subscribe((result: Customer[]) => {
      this.filteredCustomers = result;
    });
  }
  

  filterCustomers(searchTerm: string) {
    if (this.searchTerm.length > 0) {
      this.svc.searchCustomers(this.searchTerm, this.pageSize).subscribe((result: Customer[]) => {
        this.filteredCustomers = result;
      });
    }
    else {
      this.filteredCustomers = this.allCustomers;
    }
    
  }

  deleteCustomer(customerName: string) {
    this.svc.deleteCustomer(customerName).subscribe(() => {
      this.customers = this.customers.filter(customer => customer.name !== customerName);
    });
  }

  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  public clearSearchTerm() {
    this.filteredCustomers = this.allCustomers;
    this.searchTerm = "";
  }


  /////////////////////////////////////////////////


  //public onSearchChange(event: string) {
  //  this.searchTerm = event;
  //  if(this.searchTerm.length > 0)
  //  {
  //    this.svc.searchCustomers(this.searchTerm).subscribe((result: Customer[]) => {
  //      this.customers = result;
  //    });
  //  }
  //  else
  //  {
  //    this.customers = this.allCustomers;
  //  }
  //}
}
