import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Worker } from '../../models/worker.model';

@Component({
  selector: 'app-worker-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if (isOpen && worker) {
      <div class="modal-overlay" (click)="onBackdropClick($event)">
        <div class="modal" role="dialog">
          <div class="modal-header green">Werker bewerken</div>

          <form [formGroup]="form" (ngSubmit)="onSave()">
            <div class="modal-body">
              <div class="modal-row">
                <div class="modal-field">
                  <label>Voornaam <span class="req">*</span></label>
                  <input type="text" formControlName="firstName" placeholder="Voornaam" />
                </div>
                <div class="modal-field">
                  <label>Familienaam <span class="req">*</span></label>
                  <input type="text" formControlName="lastName" placeholder="Familienaam" />
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="modal-btn modal-btn-cancel" (click)="cancel.emit()">
                Annuleren
              </button>
              <button type="submit" class="modal-btn modal-btn-save green" [disabled]="form.invalid">
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
      width: 400px;
      max-width: 90vw;
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

    .modal-header.green::before { background: #22c55e; }

    .modal-body {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .modal-row {
      display: flex;
      gap: 12px;
    }

    .modal-field {
      flex: 1;
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
      border-color: #4ade80;
      box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.12);
      background: var(--card-bg);
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

    .modal-btn-save.green {
      background: #22c55e;
      box-shadow: 0 1px 3px rgba(34, 197, 94, 0.25);
    }

    .modal-btn-save:hover:not(:disabled) { transform: translateY(-1px); }
    .modal-btn-save.green:hover:not(:disabled) { background: #16a34a; }

    .modal-btn-save:disabled {
      background: #c5cdd8;
      cursor: not-allowed;
      box-shadow: none;
    }

    .req { color: #ef4444; }
  `],
})
export class WorkerEditModalComponent implements OnChanges {
  @Input() worker: Worker | null = null;
  @Input() isOpen = false;
  @Output() save = new EventEmitter<Worker>();
  @Output() cancel = new EventEmitter<void>();

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['worker'] && this.worker) {
      this.form.patchValue({
        firstName: this.worker.firstName,
        lastName: this.worker.lastName,
      });
    }
  }

  onSave(): void {
    if (this.form.invalid || !this.worker) return;
    const v = this.form.value;
    this.save.emit({ ...this.worker, firstName: v.firstName!, lastName: v.lastName! });
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cancel.emit();
    }
  }
}
