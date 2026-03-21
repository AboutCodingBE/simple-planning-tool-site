import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlanningService } from '../../services/planning.service';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site.model';
import { DayPlan, WeekPlan } from '../../models/planning.model';
import { SiteTagComponent } from '../../shared/site-tag/site-tag.component';

const DAY_LABELS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

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

function toDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getMondayOf(date: Date): Date {
  const d = new Date(date);
  const dow = d.getDay() || 7;
  d.setDate(d.getDate() - (dow - 1));
  return d;
}

interface DayCell {
  date: Date;
  dateStr: string;
  label: string;
  isToday: boolean;
  isInRange: boolean;
  sites: Site[];
  dragOver: boolean;
}

interface WeekBlock {
  weekNumber: number;
  year: number;
  days: DayCell[];
  weekSites: Site[];
}

@Component({
  selector: 'app-detail-overview',
  standalone: true,
  imports: [SiteTagComponent],
  templateUrl: './detail-overview.component.html',
  styleUrl: './detail-overview.component.css',
})
export class DetailOverviewComponent {
  private planningService = inject(PlanningService);
  private siteService = inject(SiteService);

  readonly dayLabels = DAY_LABELS;
  readonly today = toDateStr(new Date());

  fromDate = signal(toDateStr(getMondayOf(new Date())));
  untilDate = signal(toDateStr(this.getFriday4WeeksAhead()));

  allSites = toSignal(this.siteService.getSites(), { initialValue: [] as Site[] });
  private dayPlans = toSignal(this.planningService.getDayPlans(), { initialValue: [] as DayPlan[] });
  private weekPlans = toSignal(this.planningService.getWeekPlans(), { initialValue: [] as WeekPlan[] });

  weekBlocks = computed<WeekBlock[]>(() => {
    const from = new Date(this.fromDate());
    const until = new Date(this.untilDate());
    const blocks: WeekBlock[] = [];

    let current = getMondayOf(from);

    while (current <= until) {
      const wn = isoWeekNumber(current);
      const wy = isoWeekYear(current);
      const days: DayCell[] = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(current);
        day.setDate(current.getDate() + i);
        const dateStr = toDateStr(day);
        const dayPlan = this.dayPlans().find(p => p.date === dateStr);

        days.push({
          date: day,
          dateStr,
          label: DAY_LABELS[i],
          isToday: dateStr === this.today,
          isInRange: day >= from && day <= until,
          sites: dayPlan?.sites ?? [],
          dragOver: false,
        });
      }

      const weekPlan = this.weekPlans().find(p => p.weekNumber === wn && p.year === wy);
      const weekSites = weekPlan
        ? [...new Map(weekPlan.slots.flat().map(s => [s.id, s])).values()]
        : [];

      blocks.push({ weekNumber: wn, year: wy, days, weekSites });
      current.setDate(current.getDate() + 7);
    }
    return blocks;
  });

  onFromChange(event: Event): void {
    this.fromDate.set((event.target as HTMLInputElement).value);
  }

  onUntilChange(event: Event): void {
    this.untilDate.set((event.target as HTMLInputElement).value);
  }

  onDayDragOver(event: DragEvent, day: DayCell): void {
    event.preventDefault();
    day.dragOver = true;
  }

  onDayDragLeave(day: DayCell): void {
    day.dragOver = false;
  }

  onDayDrop(event: DragEvent, day: DayCell): void {
    event.preventDefault();
    day.dragOver = false;
    const data = event.dataTransfer?.getData('application/json');
    if (!data) return;
    try {
      const parsed = JSON.parse(data);
      if (parsed.type === 'site') {
        const site = this.allSites().find(s => s.id === parsed.id);
        if (site) {
          this.planningService.assignSiteToDay(day.dateStr, site);
        }
      }
    } catch {}
  }

  removeSiteFromDay(dateStr: string, siteId: number): void {
    this.planningService.removeSiteFromDay(dateStr, siteId);
  }

  private getFriday4WeeksAhead(): Date {
    const d = new Date();
    const dow = d.getDay() || 7;
    d.setDate(d.getDate() + (5 - dow) + 28);
    return d;
  }
}
