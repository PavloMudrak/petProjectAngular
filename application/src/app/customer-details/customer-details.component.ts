import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../Customer';
import { CustomerService } from '../customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer!: Customer;
  customerForm!: FormGroup;
  isEditModeActive: boolean = true;
  customerUniqueName: string = '';
  validationsErrors: string[] = [];


  constructor(private formBuilder: FormBuilder,
    private svc: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
    //this.customerForm = this.formBuilder.group({
    //  name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    //  company: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    //  phone: ['', [Validators.required, Validators.minLength(4), Validators.minLength(9), Validators.maxLength(9)]],
    //  email: ['', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)]]
    //});
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.setCustomer();
  }

  get form() { return this.customerForm.controls; }

  onSubmit() {
    this.updateCustomerFromForm()
    if (this.isEditModeActive) {
      this.svc.updateCustomer(this.customerUniqueName, this.customer)
        .subscribe(() => {
          this.router.navigate(['/customers']);
        }, error => {
          this.validationsErrors = error.error.map((e: { errorMessage: any; }) => e.errorMessage);
        });
    }
    else {
      this.svc.createCustomer(this.customer)
        .subscribe(() => {
          this.router.navigate(['/customers']);
        }, error => {
          this.validationsErrors = error.error.map((e: { errorMessage: any; }) => e.errorMessage);
        });
    }
  }

  goBack() {
    this.router.navigate(['/customers']);
  }

  private updateCustomerFromForm() {
    this.customer.name = this.customerForm.get('name')?.value;
    this.customer.company = this.customerForm.get('company')?.value;
    this.customer.phone = this.customerForm.get('phone')?.value;
    this.customer.email = this.customerForm.get('email')?.value;
  }

  private setCustomer(): void {
    const customerName = this.route.snapshot.paramMap.get('name');
    if (customerName !== null) {
      this.customerUniqueName = customerName;
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
    else {
      this.isEditModeActive = false;
      const emptyCustomer: Customer = { name: '', company: '', phone: '', email: '' };
      this.customer = emptyCustomer;

    }
  }
}


