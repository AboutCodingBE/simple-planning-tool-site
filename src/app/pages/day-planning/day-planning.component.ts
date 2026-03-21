import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PlanningService } from '../../services/planning.service';
import { WorkerService } from '../../services/worker.service';
import { Site } from '../../models/site.model';
import { Worker } from '../../models/worker.model';
import { DayPlan } from '../../models/planning.model';
import { WorkerTagComponent } from '../../shared/worker-tag/worker-tag.component';

@Component({
  selector: 'app-day-planning',
  standalone: true,
  imports: [WorkerTagComponent],
  template: `
    <div class="dp-toolbar">
      <label>Datum</label>
      <input type="date" [value]="selectedDate()" (change)="onDateChange($event)" />
    </div>

    <div class="dp-content">
      <div class="dp-sites-grid">
        @for (site of dayPlan().sites; track site.id) {
          <div class="dp-site-card">
            <div class="dp-site-card-header">{{ site.name }}</div>
            <div class="dp-workers-drop"
                 [class.drag-over]="isDragOverSite(site.id)"
                 (dragover)="onWorkerDragOver($event, site.id)"
                 (dragleave)="onWorkerDragLeave(site.id)"
                 (drop)="onWorkerDrop($event, site)">
              @for (worker of getWorkersForSite(site.id); track worker.id) {
                <app-worker-tag
                  [worker]="worker"
                  [removable]="true"
                  (remove)="removeWorker(site.id, $event.id)">
                </app-worker-tag>
              }
              @if (getWorkersForSite(site.id).length === 0) {
                <p class="dp-empty-hint">Sleep een werker hiernaartoe</p>
              }
            </div>
          </div>
        }

        @if (dayPlan().sites.length === 0) {
          <div class="dp-no-sites">
            <p>Geen werven gepland voor deze dag.</p>
            <button class="dp-plan-btn" (click)="goToMonthOverview()">
              Plan een werf
            </button>
          </div>
        }
      </div>

      <div class="dp-workers-panel">
        <div class="dp-workers-header">Werkers</div>
        <div class="dp-workers-list">
          @for (worker of allWorkers(); track worker.id) {
            <app-worker-tag [worker]="worker" [removable]="false"></app-worker-tag>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dp-toolbar {
      padding: 0 36px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .dp-toolbar label {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .dp-toolbar input[type="date"] {
      font-family: inherit;
      font-size: 13px;
      padding: 7px 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--card-bg);
      color: var(--text);
      outline: none;
      transition: border-color 0.15s;
    }

    .dp-toolbar input[type="date"]:focus {
      border-color: var(--blue-400);
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
    }

    .dp-content {
      flex: 1;
      display: flex;
      padding: 0 36px 36px;
      gap: 20px;
      overflow: hidden;
    }

    .dp-sites-grid {
      flex: 1;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      align-content: start;
      padding-right: 4px;
      padding-bottom: 4px;
    }

    .dp-site-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: box-shadow 0.2s ease;
      animation: fadeIn 0.3s ease both;
    }

    .dp-site-card:hover { box-shadow: var(--shadow-md); }

    .dp-site-card-header {
      padding: 12px 16px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.2px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(to right, var(--blue-50), transparent);
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dp-site-card-header::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background: var(--blue-500);
      border-radius: 2px;
    }

    .dp-workers-drop {
      min-height: 80px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: background 0.15s ease;
    }

    .dp-workers-drop.drag-over { background: var(--blue-50); }

    .dp-empty-hint {
      font-size: 12px;
      color: var(--text-muted);
      font-style: italic;
      text-align: center;
      padding: 16px 0;
      pointer-events: none;
    }

    .dp-no-sites {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 60px 20px;
      color: var(--text-muted);
      font-size: 14px;
    }

    .dp-plan-btn {
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 24px;
      background: var(--blue-500);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgba(77, 141, 247, 0.25);
    }

    .dp-plan-btn:hover {
      background: var(--blue-600);
      transform: translateY(-1px);
    }

    .dp-workers-panel {
      width: 190px;
      min-width: 190px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .dp-workers-header {
      padding: 14px 16px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.2px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(to right, #f0fdf4, transparent);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dp-workers-header::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background: #22c55e;
      border-radius: 2px;
    }

    .dp-workers-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  `],
})
export class DayPlanningComponent {
  private planningService = inject(PlanningService);
  private workerService = inject(WorkerService);
  private router = inject(Router);

  selectedDate = signal(new Date().toISOString().split('T')[0]);
  allWorkers = toSignal(this.workerService.getWorkers(), { initialValue: [] as Worker[] });
  private dayPlans = toSignal(this.planningService.getDayPlans(), { initialValue: [] as DayPlan[] });

  private dragOverSites = signal<Set<number>>(new Set());

  dayPlan = computed<DayPlan>(() => {
    const date = this.selectedDate();
    return this.dayPlans().find(p => p.date === date)
      ?? { date, sites: [], workerAssignments: {} };
  });

  getWorkersForSite(siteId: number): Worker[] {
    return this.dayPlan().workerAssignments[siteId] ?? [];
  }

  isDragOverSite(siteId: number): boolean {
    return this.dragOverSites().has(siteId);
  }

  onDateChange(event: Event): void {
    this.selectedDate.set((event.target as HTMLInputElement).value);
  }

  onWorkerDragOver(event: DragEvent, siteId: number): void {
    event.preventDefault();
    this.dragOverSites.update(s => new Set([...s, siteId]));
  }

  onWorkerDragLeave(siteId: number): void {
    this.dragOverSites.update(s => {
      const next = new Set(s);
      next.delete(siteId);
      return next;
    });
  }

  onWorkerDrop(event: DragEvent, site: Site): void {
    event.preventDefault();
    this.dragOverSites.update(s => {
      const next = new Set(s);
      next.delete(site.id);
      return next;
    });
    const data = event.dataTransfer?.getData('application/json');
    if (!data) return;
    try {
      const parsed = JSON.parse(data);
      if (parsed.type === 'worker') {
        const worker = this.allWorkers().find(w => w.id === parsed.id);
        if (worker) {
          this.planningService.assignWorkerToSite(this.selectedDate(), site.id, worker);
        }
      }
    } catch {}
  }

  removeWorker(siteId: number, workerId: number): void {
    this.planningService.removeWorkerFromSite(this.selectedDate(), siteId, workerId);
  }

  goToMonthOverview(): void {
    this.router.navigate(['/month-overview']);
  }
}
