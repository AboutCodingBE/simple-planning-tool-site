import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Site } from '../../models/site.model';

@Component({
  selector: 'app-site-tag',
  standalone: true,
  template: `
    <div class="site-tag"
         draggable="true"
         (dragstart)="onDragStart($event)">
      {{ site.name }}
      @if (removable) {
        <button class="site-tag-remove" (click)="onRemove($event)">×</button>
      }
    </div>
  `,
  styles: [`
    .site-tag {
      background: var(--tag-bg);
      border: 1px solid var(--tag-border);
      border-radius: 5px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      color: var(--tag-text);
      cursor: grab;
      user-select: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.15s ease;
      position: relative;
    }

    .site-tag:hover {
      background: var(--blue-100);
      border-color: var(--blue-400);
      box-shadow: var(--shadow-sm);
      transform: translateY(-1px);
    }

    .site-tag:active {
      cursor: grabbing;
      transform: scale(0.97);
      box-shadow: var(--shadow-md);
    }

    .site-tag-remove {
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

    .site-tag-remove:hover {
      opacity: 1;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  `],
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
