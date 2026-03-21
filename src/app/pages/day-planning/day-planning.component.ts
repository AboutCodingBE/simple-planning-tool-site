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
  templateUrl: './day-planning.component.html',
  styleUrl: './day-planning.component.css',
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
