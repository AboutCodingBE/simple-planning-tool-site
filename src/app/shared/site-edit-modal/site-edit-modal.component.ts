import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Site } from '../../models/site.model';

@Component({
  selector: 'app-site-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './site-edit-modal.component.html',
  styleUrl: './site-edit-modal.component.css',
})
export class SiteEditModalComponent implements OnChanges {
  @Input() site: Site | null = null;
  @Input() isOpen = false;
  @Output() save = new EventEmitter<Site>();
  @Output() cancel = new EventEmitter<void>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    isPrivateCustomer: new FormControl(false),
    desiredDate: new FormControl<string | null>(null),
    durationInDays: new FormControl<number | null>(null),
    transport: new FormControl<string | null>(null),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['site'] && this.site) {
      this.form.patchValue({
        name: this.site.name,
        customerName: this.site.customerName,
        isPrivateCustomer: this.site.isPrivateCustomer,
        desiredDate: this.site.desiredDate,
        durationInDays: this.site.durationInDays,
        transport: this.site.transport,
      });
    }
  }

  onSave(): void {
    if (this.form.invalid || !this.site) return;
    const v = this.form.value;
    this.save.emit({
      ...this.site,
      name: v.name!,
      customerName: v.customerName!,
      isPrivateCustomer: v.isPrivateCustomer ?? false,
      desiredDate: v.desiredDate ?? null,
      durationInDays: v.durationInDays ?? null,
      transport: v.transport ?? null,
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cancel.emit();
    }
  }
}
