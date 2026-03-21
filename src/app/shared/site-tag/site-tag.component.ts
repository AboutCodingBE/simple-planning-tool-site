import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Site } from '../../models/site.model';

@Component({
  selector: 'app-site-tag',
  standalone: true,
  templateUrl: './site-tag.component.html',
  styleUrl: './site-tag.component.css',
})
export class SiteTagComponent {
  @Input({ required: true }) site!: Site;
  @Input() removable = false;
  @Output() remove = new EventEmitter<Site>();

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData(
      'application/json',
      JSON.stringify({ type: 'site', id: this.site.id }),
    );
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.remove.emit(this.site);
  }
}
