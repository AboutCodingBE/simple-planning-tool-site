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
  templateUrl: './month-overview.component.html',
  styleUrl: './month-overview.component.css',
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
