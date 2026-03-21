import { Site } from './site.model';
import { Worker } from './worker.model';

export interface WeekPlan {
  weekNumber: number;
  year: number;
  slots: Site[][]; // always 5 slots
}

export interface DayPlan {
  date: string; // ISO "2026-03-20"
  sites: Site[];
  workerAssignments: Record<number, Worker[]>; // siteId -> workers
}
