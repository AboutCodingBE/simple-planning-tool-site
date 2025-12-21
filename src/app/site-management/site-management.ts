import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CreateSiteRequest } from './domain';

@Component({
  selector: 'app-site-management',
  imports: [ReactiveFormsModule],
  templateUrl: './site-management.html',
  styleUrl: './site-management.css',
})
export class SiteManagement {
  private http = inject(HttpClient);

  siteForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    isPrivateCustomer: new FormControl(false),
    desiredDate: new FormControl<string | null>(null),
    durationInDays: new FormControl<number | null>(null),
    transport: new FormControl<string | null>(null),
  });

  onSubmit() {
    if (this.siteForm.valid) {
      const formValue = this.siteForm.value;

      const request: CreateSiteRequest = {
        name: formValue.name!,
        customer_name: formValue.customerName!,
        is_private_customer: formValue.isPrivateCustomer ?? false,
        desired_date: formValue.desiredDate ?? null,
        duration_in_days: formValue.durationInDays ?? null,
        transport: formValue.transport ?? null,
      };

      this.http.post('http://localhost:8080/sites', request).subscribe({
        next: (response) => {
          console.log('Site created successfully:', response);
          this.siteForm.reset();
          // TODO: Fetch all sites with status open when endpoint is available
        },
        error: (error) => {
          console.error('Error creating site:', error);
        }
      });
    }
  }
}
