import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Site } from '../../models/site.model';
import { SiteTagComponent } from '../site-tag/site-tag.component';

@Component({
  selector: 'app-drop-slot',
  standalone: true,
  imports: [SiteTagComponent],
  template: `
    <div class="drop-slot"
         [class.drag-over]="isDragOver"
         (dragover)="onDragOver($event)"
         (dragleave)="onDragLeave()"
         (drop)="onDrop($event)">
      @for (site of items; track site.id) {
        <app-site-tag
          [site]="site"
          [removable]="true"
          (remove)="itemRemoved.emit($event.id)">
        </app-site-tag>
      }
    </div>
  `,
  styles: [`
    .drop-slot {
      min-height: 30px;
      background: var(--slot-bg);
      border: 1.5px dashed var(--slot-border);
      border-radius: var(--radius-sm);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 3px;
      padding: 3px;
      font-size: 11px;
      color: #bbb;
      transition: all 0.15s ease;
    }

    .drop-slot:hover {
      border-color: var(--blue-200);
      background: var(--blue-50);
    }

    .drop-slot.drag-over {
      background: var(--slot-hover);
      border-color: var(--slot-hover-border);
      border-style: solid;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
    }
  `],
})
export class DropSlotComponent {
  @Input() items: Site[] = [];
  @Input() maxItems = 5;
  @Output() itemDropped = new EventEmitter<string>();
  @Output() itemRemoved = new EventEmitter<number>();

  isDragOver = false;

  onDragOver(event: DragEvent): void {
    if (this.items.length < this.maxItems) {
      event.preventDefault();
      this.isDragOver = true;
    }
  }

  onDragLeave(): void {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const data = event.dataTransfer?.getData('application/json');
    if (data) {
      this.itemDropped.emit(data);
    }
  }
}
