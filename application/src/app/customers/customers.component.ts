import { Component } from '@angular/core';
import { Customer } from '../Customer';
import { CustomerService } from './customers.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { trigger } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  title = 'Customer.UI';
  searchTerm: string = '';

  sortColumn: string = 'Name';
  sortOrder: string = 'ASC';
  sortColumnOptions: string[] = ["Name", "CompanyName", "Phone", "EmailAddress"];
  sortOrderOptions: string[] = ["ASC", "DESC"];

  firstCustomers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  pageSizeOptions: number[] = [5, 10];
  pageIndex: number = 1;
  pageSize: number = 0;
  pagesCount = 0;

  constructor(private svc: CustomerService,
    private router: Router) { }

  ngOnInit() {
    this.sortColumn = this.sortColumnOptions[0];
    this.pageSize = this.pageSizeOptions[1];
    this.getCustomersByOptions();
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.pageIndex = 1;
    this.getCustomersByOptions();
  }


  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.getCustomersByOptions();
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
      this.getCustomersByOptions();
      
    });

  }

  public clearSearchTerm() {
    this.pageIndex = 1;
    this.searchTerm = "";
    this.getCustomersByOptions();
  }

  public nextPage() {
    this.pageIndex += 1;
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


  editCustomer(customerName: string) {
    this.router.navigate(['/customers', customerName, 'edit']);
  }

  private getCustomersByOptions() {
    this.svc.searchCustomers(this.searchTerm, this.pageSize, this.pageIndex, this.sortColumn, this.sortOrder).subscribe((result: any) => {
      this.filteredCustomers = result.customers;
      this.pagesCount = result.pagesCount;
    });
  }
}
