import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Site } from '../../models/site.model';
import { SiteTagComponent } from '../site-tag/site-tag.component';

@Component({
  selector: 'app-drop-slot',
  standalone: true,
  imports: [SiteTagComponent],
  templateUrl: './drop-slot.component.html',
  styleUrl: './drop-slot.component.css',
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
