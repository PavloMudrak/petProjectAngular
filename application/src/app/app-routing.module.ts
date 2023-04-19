import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:name/edit', component: CustomerDetailsComponent },
  { path: 'customers/create', component: CustomerDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
