import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Worker } from '../../models/worker.model';

@Component({
  selector: 'app-worker-tag',
  standalone: true,
  template: `
    <div class="worker-tag"
         draggable="true"
         (dragstart)="onDragStart($event)">
      {{ worker.firstName }} {{ worker.lastName }}
      @if (removable) {
        <button class="worker-tag-remove" (click)="onRemove($event)">×</button>
      }
    </div>
  `,
  styles: [`
    .worker-tag {
      background: var(--worker-tag-bg);
      border: 1px solid var(--worker-tag-border);
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: 500;
      color: var(--worker-tag-text);
      cursor: grab;
      user-select: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.15s ease;
      position: relative;
    }

    .worker-tag:hover {
      background: #dcfce7;
      border-color: #4ade80;
      box-shadow: var(--shadow-sm);
      transform: translateY(-1px);
    }

    .worker-tag:active {
      cursor: grabbing;
      transform: scale(0.97);
    }

    .worker-tag-remove {
      position: absolute;
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      color: var(--text-muted);
      font-size: 14px;
      line-height: 16px;
      cursor: pointer;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.4;
      transition: all 0.15s ease;
      padding: 0;
      font-family: inherit;
    }

    .worker-tag-remove:hover {
      opacity: 1;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  `],
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
