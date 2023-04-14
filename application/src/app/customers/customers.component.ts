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
  firstCustomers: Customer[] = [];
  searchTerm: string = '';
  filteredCustomers: Customer[] = [];
  pageSizeOptions: number[] = [5, 10, 14];
  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 0;
  currentPageIndex = 1;
  pagesCount = 10;

  constructor(private svc: CustomerService) { }

  ngOnInit() {
    this.getCustomersByOptions();
    this.setPagesCount();
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.pageIndex = 0;
    this.getCustomersByOptions();
    this.setPagesCount();
  }


  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.getCustomersByOptions();
    this.setPagesCount();
  }

  deleteCustomer(customerName: string) {
    this.svc.deleteCustomer(customerName).subscribe(() => {
      this.filteredCustomers = this.filteredCustomers.filter(customer => customer.name !== customerName);
    });
  }

  public clearSearchTerm() {
    this.pageIndex = 1;
    this.searchTerm = "";
    this.getCustomersByOptions();
    this.setPagesCount();
  }

  public nextPage() {
    this.currentPageIndex += 1;
    this.getCustomersByOptions();
  }

  public previousPage() {
    this.currentPageIndex -= 1;
    this.getCustomersByOptions();
  }

  public goToPage(pageIndex: number) {
    if (pageIndex == 1)
      this.currentPageIndex = 1;
    else
      this.currentPageIndex = this.pagesCount;

    this.getCustomersByOptions();
  }

  private getCustomersByOptions() {
    this.svc.searchCustomers(this.searchTerm, this.pageSize, this.currentPageIndex).subscribe((result: Customer[]) => {
      this.filteredCustomers = result;
    });
  }

  private setPagesCount()
  {
    this.svc.getPagesCount(this.searchTerm, this.pageSize, this.currentPageIndex).subscribe((result) => {
      this.pagesCount = result;
    });
  }
}
