import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Worker } from '../../models/worker.model';

@Component({
  selector: 'app-worker-tag',
  standalone: true,
  templateUrl: './worker-tag.component.html',
  styleUrl: './worker-tag.component.css',
})
export class WorkerTagComponent {
  @Input({ required: true }) worker!: Worker;
  @Input() removable = false;
  @Output() remove = new EventEmitter<Worker>();

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData(
      'application/json',
      JSON.stringify({ type: 'worker', id: this.worker.id }),
    );
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.remove.emit(this.worker);
  }
}
