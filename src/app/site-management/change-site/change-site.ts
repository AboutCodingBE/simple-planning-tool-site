import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateSiteRequest, SiteResponse } from './dto'
import { Site } from '../domain'

@Component({
  selector: 'app-change-site',
  imports: [ReactiveFormsModule],
  templateUrl: './change-site.html',
  styleUrl: './change-site.css',
})
export class ChangeSite {

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  site = signal<SiteResponse | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<SiteResponse>(`http://localhost:8080/sites/${id}`)
      .subscribe(s => {
          this.site.set(s);

          console.log(s);
          console.log(s.customer);

          this.siteForm.patchValue({
            name: s.name,
            customerName: s.customer?.customer_name?? '',
            isPrivateCustomer: s.customer?.is_private_customer ?? false,
            desiredDate: s.desired_date,
            durationInDays: s.duration_in_days,
            transport: s.transport
          });
        });
  }

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
      const request: UpdateSiteRequest = {
        name: formValue.name!,
        customer_name: formValue.customerName!,
        is_private_customer: formValue.isPrivateCustomer ?? false,
        desired_date: formValue.desiredDate ?? null,
        duration_in_days: formValue.durationInDays ?? null,
        transport: formValue.transport ?? null,
      };

      this.http.post('http://localhost:8080/sites/', request).subscribe({
        next: (response) => {
          console.log('Site updated successfully:', response);

        },
        error: (error) => {
          console.error('Error updating site:', error);
        }
      });
    }
  }

}
