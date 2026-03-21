import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Worker } from '../../models/worker.model';

@Component({
  selector: 'app-worker-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './worker-edit-modal.component.html',
  styleUrl: './worker-edit-modal.component.css',
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
