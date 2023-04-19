import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../Customer';
import { CustomerService } from '../customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsService } from './customer-details.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer!: Customer;
  customerForm: FormGroup;
  isEditModeActive: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private svc: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: CustomerDetailsService) {
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      company: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      phone: ['', [Validators.required, Validators.minLength(4), Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.setCustomer();

  }

  get form() { return this.customerForm.controls; }

  onSubmit() {
    console.log(this.customerForm.value);
  }


  private setCustomer(): void {
    const customerName = this.route.snapshot.paramMap.get('name');
    if (customerName !== null) {
      this.isEditModeActive = true;
      this.svc.getCustomerByName(customerName)
        .subscribe(customer => {
          this.customer = customer;
          this.customerForm.patchValue({
            name: customer.name,
            company: customer.company,
            phone: customer.phone,
            email: customer.email
          });
        },
          error => console.error(error));
    }
    else{
      this.isEditModeActive = false;
    }
    console.log(this.isEditModeActive)
  }
}

