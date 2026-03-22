import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Site } from '../models/site.model';
import { Worker } from '../models/worker.model';
import { WeekPlan, DayPlan } from '../models/planning.model';

// Helpers ─────────────────────────────────────────────────────────────────────

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

function emptySlots(): Site[][] {
  return [[], [], [], [], []];
}

// ── API response shapes ───────────────────────────────────────────────────────

interface MonthlyPlanSiteResponse { id: number; name: string; }
interface MonthlyPlanWeekResponse { number: number; sites: MonthlyPlanSiteResponse[]; }
interface MonthlyPlanMonthResponse { month: string; weeks: MonthlyPlanWeekResponse[]; }

interface PlanningSiteResponse { id: number; name: string; duration_in_days: number | null; status: string; }
interface PlanningDayResponse  { date: string; sites: PlanningSiteResponse[]; }
interface PlanningWeekResponse {
  week: number;
  monday: PlanningDayResponse; tuesday: PlanningDayResponse; wednesday: PlanningDayResponse;
  thursday: PlanningDayResponse; friday: PlanningDayResponse;
  saturday: PlanningDayResponse; sunday: PlanningDayResponse;
}
interface PlanningResponse { from: string; until: string; weeks: PlanningWeekResponse[]; }

interface DayPlanWorkerResponse { worker_id: string; worker_firstname: string; worker_lastname: string; }
interface DayPlanSiteResponse {
  site_id: string | number;
  site_name: string;
  execution_date: string;
  duration_in_days: number;
  site_status: string;
  workers: DayPlanWorkerResponse[];
}
interface DayPlanResponse { date: string; plannedSites: DayPlanSiteResponse[]; }

const WEEK_DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

function toSiteFromPlanning(s: PlanningSiteResponse): Site {
  return {
    id: s.id, name: s.name,
    customerName: '', isPrivateCustomer: false,
    desiredDate: null, durationInDays: s.duration_in_days, transport: null,
    status: s.status as Site['status'],
  };
}

function toDayPlan(response: DayPlanResponse): DayPlan {
  const sites: Site[] = [];
  const workerAssignments: Record<number, Worker[]> = {};

  response.plannedSites.forEach(s => {
    const siteId = Number(s.site_id);
    sites.push({
      id: siteId, name: s.site_name,
      customerName: '', isPrivateCustomer: false,
      desiredDate: s.execution_date, durationInDays: s.duration_in_days,
      transport: null, status: s.site_status as Site['status'],
    });
    workerAssignments[siteId] = s.workers.map(w => ({
      id: Number(w.worker_id),
      firstName: w.worker_firstname,
      lastName: w.worker_lastname,
    }));
  });

  return { date: response.date, sites, workerAssignments };
}

function toDayPlans(response: PlanningResponse): DayPlan[] {
  const dayPlans: DayPlan[] = [];

  response.weeks.forEach(week => {
    WEEK_DAY_KEYS.forEach(key => {
      const day = week[key];
      const sites = day.sites.map(toSiteFromPlanning);
      if (sites.length > 0) {
        dayPlans.push({ date: day.date, sites, workerAssignments: {} });
      }
    });
  });

  return dayPlans;
}

// Week numbers near month boundaries can belong to a different ISO year.
// e.g. week 52/53 showing in January belongs to the previous year,
//      week 1 showing in December belongs to the next year.
function resolveWeekYear(weekNumber: number, calYear: number, calMonth: number): number {
  if (weekNumber >= 52 && calMonth === 0) return calYear - 1;
  if (weekNumber === 1  && calMonth === 11) return calYear + 1;
  return calYear;
}

function toWeekPlans(months: MonthlyPlanMonthResponse[]): WeekPlan[] {
  const now = new Date();
  const result: WeekPlan[] = [];

  months.forEach((monthData, i) => {
    const totalMonth = now.getMonth() + i;
    const calYear  = now.getFullYear() + Math.floor(totalMonth / 12);
    const calMonth = totalMonth % 12;

    monthData.weeks.forEach(week => {
      const year = resolveWeekYear(week.number, calYear, calMonth);
      if (result.some(p => p.weekNumber === week.number && p.year === year)) return;

      // Backend has no slot concept — spread one site per slot column
      const slots = emptySlots();
      week.sites.forEach((s, idx) => {
        if (idx < 5) {
          slots[idx] = [{
            id: s.id, name: s.name,
            customerName: '', isPrivateCustomer: false,
            desiredDate: null, durationInDays: null, transport: null, status: 'OPEN',
          }];
        }
      });

      result.push({ weekNumber: week.number, year, slots });
    });
  });

  return result;
}

// Mock seed data ──────────────────────────────────────────────────────────────

const S1: Site = {
  id: 1, name: 'Renovatie Dijkstraat', customerName: 'Vermeersch NV',
  isPrivateCustomer: false, desiredDate: '2026-04-01', durationInDays: 5,
  transport: 'Bestelwagen', status: 'OPEN',
};
const S2: Site = {
  id: 2, name: 'Nieuwbouw Kerkplein', customerName: 'De Groote Familie',
  isPrivateCustomer: true, desiredDate: '2026-04-15', durationInDays: 10,
  transport: 'Vrachtwagen', status: 'OPEN',
};
const S3: Site = {
  id: 3, name: 'Dakwerken Stationsweg', customerName: 'Gemeente Aalst',
  isPrivateCustomer: false, desiredDate: '2026-03-28', durationInDays: 3,
  transport: 'Bestelwagen', status: 'OPEN',
};
const S4: Site = {
  id: 4, name: 'Verbouwing Handelspand', customerName: 'Bakkerij Janssen',
  isPrivateCustomer: true, desiredDate: '2026-05-01', durationInDays: 7,
  transport: null, status: 'OPEN',
};

const W1: Worker = { id: 1, firstName: 'Luc', lastName: 'Vermeersch' };
const W2: Worker = { id: 2, firstName: 'Joris', lastName: 'De Smedt' };
const W3: Worker = { id: 3, firstName: 'Pieter', lastName: 'Van den Berg' };

function buildSeedWeekPlans(): WeekPlan[] {
  const today = new Date();
  const wn = isoWeekNumber(today);
  const wy = isoWeekYear(today);

  const nextWeekDate = new Date(today);
  nextWeekDate.setDate(today.getDate() + 7);
  const wn2 = isoWeekNumber(nextWeekDate);
  const wy2 = isoWeekYear(nextWeekDate);

  const slots1 = emptySlots();
  slots1[0] = [S1, S2];
  slots1[1] = [S3];

  const slots2 = emptySlots();
  slots2[0] = [S4];
  slots2[2] = [S1];

  return [
    { weekNumber: wn, year: wy, slots: slots1 },
    { weekNumber: wn2, year: wy2, slots: slots2 },
  ];
}

function buildSeedDayPlans(): DayPlan[] {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return [
    {
      date: today,
      sites: [S1, S3],
      workerAssignments: {
        [S1.id]: [W1, W2],
        [S3.id]: [W3],
      },
    },
    {
      date: tomorrow,
      sites: [S2],
      workerAssignments: {},
    },
  ];
}

// Service ─────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class PlanningService {
  private http = inject(HttpClient);

  private weekPlansSubject = new BehaviorSubject<WeekPlan[]>([]);
  private dayPlansSubject = new BehaviorSubject<DayPlan[]>(buildSeedDayPlans());

  constructor() {
    this.refreshMonthly();
  }

  private refreshMonthly(): void {
    this.http.get<MonthlyPlanMonthResponse[]>('/api/planning/monthly').pipe(
      map(toWeekPlans),
    ).subscribe(plans => this.weekPlansSubject.next(plans));
  }

  // ── Week plans ──────────────────────────────────────────────────────────────

  getWeekPlans(): Observable<WeekPlan[]> {
    return this.weekPlansSubject.asObservable();
  }

  assignSiteToWeek(weekNumber: number, year: number, slotIndex: number, site: Site): void {
    const plans = this.weekPlansSubject.value;
    const existing = plans.find(p => p.weekNumber === weekNumber && p.year === year);
    if (existing) {
      const slot = existing.slots[slotIndex];
      if (slot.length >= 5 || slot.some(s => s.id === site.id)) return;
    }

    this.http.put('/api/planning/monthly', { week: weekNumber, year, site_id: site.id })
      .subscribe(() => {
        const current = this.weekPlansSubject.value;
        const plan = current.find(p => p.weekNumber === weekNumber && p.year === year);

        if (plan) {
          const updatedSlots = plan.slots.map((s, i) =>
            i === slotIndex ? [...s, site] : s,
          );
          this.weekPlansSubject.next(
            current.map(p =>
              p.weekNumber === weekNumber && p.year === year ? { ...p, slots: updatedSlots } : p,
            ),
          );
        } else {
          const slots = emptySlots();
          slots[slotIndex] = [site];
          this.weekPlansSubject.next([...current, { weekNumber, year, slots }]);
        }
      });
  }

  removeSiteFromWeek(weekNumber: number, year: number, slotIndex: number, siteId: number): void {
    const plans = this.weekPlansSubject.value;
    this.weekPlansSubject.next(
      plans.map(p => {
        if (p.weekNumber !== weekNumber || p.year !== year) return p;
        const updatedSlots = p.slots.map((s, i) =>
          i === slotIndex ? s.filter(site => site.id !== siteId) : s,
        );
        return { ...p, slots: updatedSlots };
      }),
    );
  }

  // ── Day plans ───────────────────────────────────────────────────────────────

  getDayPlans(): Observable<DayPlan[]> {
    return this.dayPlansSubject.asObservable();
  }

  loadPlanning(from: string, until: string): void {
    this.http.get<PlanningResponse>(`/api/planning?from=${from}&until=${until}`).pipe(
      map(toDayPlans),
    ).subscribe(dayPlans => this.dayPlansSubject.next(dayPlans));
  }

  loadDayPlan(date: string): void {
    this.http.get<DayPlanResponse>(`/api/planning/day?date=${date}`).pipe(
      map(toDayPlan),
    ).subscribe(dayPlan => {
      const current = this.dayPlansSubject.value;
      const exists = current.some(p => p.date === date);
      this.dayPlansSubject.next(
        exists
          ? current.map(p => p.date === date ? dayPlan : p)
          : [...current, dayPlan],
      );
    });
  }

  assignSiteToDay(date: string, site: Site): void {
    const plans = this.dayPlansSubject.value;
    const existing = plans.find(p => p.date === date);
    if (existing?.sites.some(s => s.id === site.id)) return;

    this.http.patch(`/api/planning/sites/${site.id}?date=${date}`, null)
      .subscribe(() => {
        const current = this.dayPlansSubject.value;
        // Remove the site from any day it currently appears on
        const withoutSite = current.map(p =>
          p.date === date ? p : { ...p, sites: p.sites.filter(s => s.id !== site.id) },
        );
        const plan = withoutSite.find(p => p.date === date);
        if (plan) {
          this.dayPlansSubject.next(
            withoutSite.map(p => p.date === date ? { ...p, sites: [...p.sites, site] } : p),
          );
        } else {
          this.dayPlansSubject.next([...withoutSite, { date, sites: [site], workerAssignments: {} }]);
        }
      });
  }

  removeSiteFromDay(date: string, siteId: number): void {
    const plans = this.dayPlansSubject.value;
    this.dayPlansSubject.next(
      plans.map(p => {
        if (p.date !== date) return p;
        const assignments = { ...p.workerAssignments };
        delete assignments[siteId];
        return { ...p, sites: p.sites.filter(s => s.id !== siteId), workerAssignments: assignments };
      }),
    );
  }

  assignWorkerToSite(date: string, siteId: number, worker: Worker): void {
    const plans = this.dayPlansSubject.value;
    const existing = plans.find(p => p.date === date);

    if (existing) {
      const current = existing.workerAssignments[siteId] ?? [];
      if (current.some(w => w.id === worker.id)) return;
      const updated = {
        ...existing,
        workerAssignments: {
          ...existing.workerAssignments,
          [siteId]: [...current, worker],
        },
      };
      this.dayPlansSubject.next(plans.map(p => p.date === date ? updated : p));
    }
  }

  removeWorkerFromSite(date: string, siteId: number, workerId: number): void {
    const plans = this.dayPlansSubject.value;
    this.dayPlansSubject.next(
      plans.map(p => {
        if (p.date !== date) return p;
        const current = p.workerAssignments[siteId] ?? [];
        return {
          ...p,
          workerAssignments: {
            ...p.workerAssignments,
            [siteId]: current.filter(w => w.id !== workerId),
          },
        };
      }),
    );
  }
}
