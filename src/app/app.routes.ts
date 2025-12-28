import { Routes } from '@angular/router';
import { PlanningOverview } from './planning/planning-overview'
import { SiteManagement } from './site-management/site-management'
import { OpenSiteOverview } from './site-management/open-site-overview/open-site-overview'
import { CreateSite } from './site-management/create-site/create-site'
import { ChangeSite } from './site-management/change-site/change-site'

export const routes: Routes = [
  {path: '', redirectTo: '/planning-overview', pathMatch: 'full'},
  {path: 'planning-overview', component: PlanningOverview},
  {path: 'site-management', component: SiteManagement,
    children: [
        { path: '', redirectTo: 'open-overview', pathMatch: 'full' },
        { path: 'open-overview', component: OpenSiteOverview },
        { path: 'createSite', component: CreateSite },
        { path: 'changeSite/:id', component: ChangeSite },
      ]},
 ];
