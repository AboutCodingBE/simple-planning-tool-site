import { Routes } from '@angular/router';
import { MonthOverviewComponent } from './pages/month-overview/month-overview.component';
import { DetailOverviewComponent } from './pages/detail-overview/detail-overview.component';
import { DayPlanningComponent } from './pages/day-planning/day-planning.component';
import { ManagementComponent } from './pages/management/management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'month-overview', pathMatch: 'full' },
  { path: 'month-overview', component: MonthOverviewComponent },
  { path: 'detail-overview', component: DetailOverviewComponent },
  { path: 'day-planning', component: DayPlanningComponent },
  { path: 'management', component: ManagementComponent },
];
