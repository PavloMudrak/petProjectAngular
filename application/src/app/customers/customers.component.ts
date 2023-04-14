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
  searchTerm: string = '';

  sortColumn: string = 'Name';
  sortOrder: string = 'ASC';
  sortColumnOptions: string[] = ["Name", "CompanyName", "Phone", "Email"];
  sortOrderOptions: string[] = ["ASC", "DESC"];

  firstCustomers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  pageSizeOptions: number[] = [5, 10];
  pageIndex: number = 1;
  pageSize: number = 0;
  pagesCount = 10;

  constructor(private svc: CustomerService) { }

  ngOnInit() {
    this.sortColumn = this.sortColumnOptions[0];
    this.pageSize = this.pageSizeOptions[1];
    this.getCustomersByOptions();
    this.setPagesCount();
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.pageIndex = 1;
    this.getCustomersByOptions();
  }


  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.getCustomersByOptions();
    this.setPagesCount();
  }

  onSortColumnChange(sortColumn: string) {
    this.sortColumn = sortColumn;
    this.getCustomersByOptions();
  }

  onSortOrderChange(sortOrder: string) {
    this.sortOrder = sortOrder;
    this.pageIndex = 1;
    this.getCustomersByOptions();
  }

  deleteCustomer(customerName: string) {
    this.svc.deleteCustomer(customerName).subscribe(() => {
      this.filteredCustomers = this.filteredCustomers.filter(customer => customer.name !== customerName);
    });
    this.setPagesCount();
  }

  public clearSearchTerm() {
    this.pageIndex = 1;
    this.searchTerm = "";
    this.getCustomersByOptions();
  }

  public nextPage() {
    this.pageIndex += 1;
    console.log(this.pageIndex)
    this.getCustomersByOptions();
  }

  public previousPage() {
    this.pageIndex -= 1;
    this.getCustomersByOptions();
  }

  public goToPage(pageIndex: number) {
    if (pageIndex == 1)
      this.pageIndex = 1;
    else
      this.pageIndex = this.pagesCount;
    this.getCustomersByOptions();
  }

  private getCustomersByOptions() {
    this.svc.searchCustomers(this.searchTerm, this.pageSize, this.pageIndex, this.sortColumn, this.sortOrder).subscribe((result: Customer[]) => {
      this.filteredCustomers = result;
    });
  }

  private setPagesCount() {
    this.svc.getPagesCount(this.pageSize).subscribe((result) => {
      this.pagesCount = result;
    });
  }
}
