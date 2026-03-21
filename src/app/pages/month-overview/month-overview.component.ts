import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { PlanningService } from '../../services/planning.service';
import { Site } from '../../models/site.model';
import { WeekPlan } from '../../models/planning.model';
import { SiteTagComponent } from '../../shared/site-tag/site-tag.component';
import { DropSlotComponent } from '../../shared/drop-slot/drop-slot.component';

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
];

function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function isoWeekYear(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  return d.getUTCFullYear();
}

interface WeekRow {
  weekNumber: number;
  year: number;
  weekKey: string;
  slots: Site[][];
}

interface MonthBlock {
  name: string;
  year: number;
  key: string;
  weeks: WeekRow[];
}

@Component({
  selector: 'app-month-overview',
  standalone: true,
  imports: [SiteTagComponent, DropSlotComponent],
  template: `
    <div class="mo-content">
      <div class="months-column">
        @for (month of months(); track month.key) {
          <div class="month-card">
            <div class="month-card-header">{{ month.name }} {{ month.year }}</div>
            @for (week of month.weeks; track week.weekKey) {
              <div class="week-row">
                <div class="week-number">W{{ week.weekNumber }}</div>
                @for (slot of week.slots; track $index; let i = $index) {
                  <app-drop-slot
                    [items]="slot"
                    [maxItems]="5"
                    (itemDropped)="onSiteDropped($event, week.weekNumber, week.year, i)"
                    (itemRemoved)="onSiteRemoved(week.weekNumber, week.year, i, $event)">
                  </app-drop-slot>
                }
              </div>
            }
          </div>
        }
      </div>

      <div class="sites-panel">
        <div class="sites-panel-header">Werven</div>
        <div class="sites-list">
          @for (site of allSites(); track site.id) {
            <app-site-tag [site]="site" [removable]="false"></app-site-tag>
          }
          @if (allSites().length === 0) {
            <p class="empty-hint">Geen werven beschikbaar</p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mo-content {
      flex: 1;
      display: flex;
      padding: 0 36px 36px;
      gap: 20px;
      overflow: hidden;
    }

    .months-column {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-right: 4px;
      padding-bottom: 4px;
    }

    .month-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: box-shadow 0.2s ease;
      animation: fadeIn 0.35s ease both;
    }

    .month-card:nth-child(2) { animation-delay: 0.07s; }
    .month-card:nth-child(3) { animation-delay: 0.14s; }
    .month-card:hover { box-shadow: var(--shadow-md); }

    .month-card-header {
      padding: 14px 20px;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.2px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(to right, var(--blue-50), transparent);
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .month-card-header::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background: var(--blue-500);
      border-radius: 2px;
    }

    .week-row {
      display: grid;
      grid-template-columns: 48px repeat(5, 1fr);
      gap: 6px;
      padding: 7px 16px;
      border-bottom: 1px solid var(--border-light);
      align-items: start;
      min-height: 42px;
      transition: background 0.1s;
    }

    .week-row:last-child { border-bottom: none; }
    .week-row:hover { background: #fafcff; }

    .week-number {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      text-align: center;
      padding-top: 6px;
      font-variant-numeric: tabular-nums;
    }

    .sites-panel {
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

    .sites-panel-header {
      padding: 14px 16px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.2px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(to right, var(--blue-50), transparent);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sites-panel-header::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background: var(--blue-500);
      border-radius: 2px;
    }

    .sites-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .empty-hint {
      font-size: 12px;
      color: var(--text-muted);
      text-align: center;
      font-style: italic;
      padding: 16px 0;
    }
  `],
})
export class MonthOverviewComponent {
  private siteService = inject(SiteService);
  private planningService = inject(PlanningService);
  private router = inject(Router);

  allSites = toSignal(this.siteService.getSites(), { initialValue: [] as Site[] });
  private weekPlans = toSignal(this.planningService.getWeekPlans(), { initialValue: [] as WeekPlan[] });

  months = computed<MonthBlock[]>(() => {
    const now = new Date();
    return [0, 1, 2].map(offset => {
      const totalMonth = now.getMonth() + offset;
      const year = now.getFullYear() + Math.floor(totalMonth / 12);
      const month = totalMonth % 12;
      const weeks = this.getWeeksForMonth(year, month);
      return {
        year,
        month,
        name: MONTH_NAMES[month],
        key: `${year}-${month}`,
        weeks: weeks.map(w => ({
          ...w,
          weekKey: `${w.year}-W${w.weekNumber}`,
          slots: this.getSlotsForWeek(w.weekNumber, w.year),
        })),
      };
    });
  });

  private getWeeksForMonth(year: number, month: number): { weekNumber: number; year: number }[] {
    const result: { weekNumber: number; year: number }[] = [];
    const seen = new Set<string>();

    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay() || 7;
    const startMonday = new Date(firstDay);
    startMonday.setDate(firstDay.getDate() - (dayOfWeek - 1));

    const lastDay = new Date(year, month + 1, 0);
    let current = new Date(startMonday);

    while (current <= lastDay) {
      const wn = isoWeekNumber(current);
      const wy = isoWeekYear(current);
      const key = `${wy}-${wn}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push({ weekNumber: wn, year: wy });
      }
      current.setDate(current.getDate() + 7);
    }
    return result;
  }

  private getSlotsForWeek(weekNumber: number, year: number): Site[][] {
    const plan = this.weekPlans().find(p => p.weekNumber === weekNumber && p.year === year);
    return plan ? plan.slots : [[], [], [], [], []];
  }

  onSiteDropped(data: string, weekNumber: number, year: number, slotIndex: number): void {
    try {
      const parsed = JSON.parse(data);
      if (parsed.type === 'site') {
        const site = this.allSites().find(s => s.id === parsed.id);
        if (site) {
          this.planningService.assignSiteToWeek(weekNumber, year, slotIndex, site);
        }
      }
    } catch {}
  }

  onSiteRemoved(weekNumber: number, year: number, slotIndex: number, siteId: number): void {
    this.planningService.removeSiteFromWeek(weekNumber, year, slotIndex, siteId);
  }

  goToDayPlanning(): void {
    this.router.navigate(['/day-planning']);
  }
}
