import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CustomerDetailsService {

  private data!: CustomerEditCreateMode;

  setData(data: CustomerEditCreateMode) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}


export interface CustomerEditCreateMode
{
    isEditMode : boolean;
    customerName: string;
}
