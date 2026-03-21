import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Site } from '../../models/site.model';

@Component({
  selector: 'app-site-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if (isOpen && site) {
      <div class="modal-overlay" (click)="onBackdropClick($event)">
        <div class="modal" role="dialog">
          <div class="modal-header">Werf bewerken</div>

          <form [formGroup]="form" (ngSubmit)="onSave()">
            <div class="modal-body">
              <div class="modal-field">
                <label>Werf naam <span class="req">*</span></label>
                <input type="text" formControlName="name" placeholder="Naam van de werf" />
              </div>

              <div class="modal-field">
                <label>Klant naam <span class="req">*</span></label>
                <input type="text" formControlName="customerName" placeholder="Naam van de klant" />
              </div>

              <div class="modal-row">
                <div class="modal-field">
                  <label>Gewenste uitvoeringsdatum</label>
                  <input type="date" formControlName="desiredDate" />
                </div>
                <div class="modal-field">
                  <label>Duur (Dagen)</label>
                  <input type="number" formControlName="durationInDays" min="1" placeholder="0" />
                </div>
              </div>

              <div class="modal-field">
                <label>Transport</label>
                <input type="text" formControlName="transport" placeholder="bv. Bestelwagen" />
              </div>

              <label class="modal-checkbox">
                <input type="checkbox" formControlName="isPrivateCustomer" />
                Privé klant
              </label>
            </div>

            <div class="modal-footer">
              <button type="button" class="modal-btn modal-btn-cancel" (click)="cancel.emit()">
                Annuleren
              </button>
              <button type="submit" class="modal-btn modal-btn-save" [disabled]="form.invalid">
                Opslaan
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      width: 480px;
      max-width: 90vw;
      max-height: 85vh;
      overflow-y: auto;
      animation: modalIn 0.2s ease;
    }

    .modal-header {
      padding: 20px 24px 16px;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: -0.3px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-header::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 18px;
      border-radius: 2px;
      background: var(--blue-500);
    }

    .modal-body {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .modal-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .modal-field label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .modal-field input {
      font-family: inherit;
      font-size: 13px;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg);
      color: var(--text);
      outline: none;
      transition: border-color 0.15s;
    }

    .modal-field input:focus {
      border-color: var(--blue-400);
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
      background: var(--card-bg);
    }

    .modal-row {
      display: flex;
      gap: 12px;
    }

    .modal-row .modal-field { flex: 1; }

    .modal-checkbox {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--text-secondary);
      cursor: pointer;
    }

    .modal-checkbox input {
      width: 16px;
      height: 16px;
      accent-color: var(--blue-500);
      cursor: pointer;
    }

    .modal-footer {
      padding: 16px 24px 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      border-top: 1px solid var(--border-light);
    }

    .modal-btn {
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 20px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;
    }

    .modal-btn-cancel {
      background: var(--bg);
      color: var(--text-secondary);
      border: 1px solid var(--border);
    }

    .modal-btn-cancel:hover { background: #e2e8f0; }

    .modal-btn-save {
      background: var(--blue-500);
      color: white;
      box-shadow: 0 1px 3px rgba(77, 141, 247, 0.25);
    }

    .modal-btn-save:hover:not(:disabled) {
      background: var(--blue-600);
      transform: translateY(-1px);
    }

    .modal-btn-save:disabled {
      background: #c5cdd8;
      cursor: not-allowed;
      box-shadow: none;
    }

    .req { color: #ef4444; }
  `],
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
