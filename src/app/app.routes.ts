import { Routes } from '@angular/router';
import { PlanningOverview } from './planning/planning-overview'

export const routes: Routes = [
  {path: '', redirectTo: '/planning-overview', pathMatch: 'full'},
  {path: 'planning-overview', component: PlanningOverview},
 ];
