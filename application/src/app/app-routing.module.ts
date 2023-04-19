import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:name/edit', component: CustomerDetailsComponent },
  { path: 'customers/create', component: CustomerDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
