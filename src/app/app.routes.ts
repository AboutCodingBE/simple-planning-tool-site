import { Routes } from '@angular/router';
import { PlanningOverview } from './planning/planning-overview'
import { SiteManagement } from './site-management/site-management'
import { OpenSiteOverview } from './site-management/open-site-overview/open-site-overview'
import { CreateSite } from './site-management/create-site/create-site'
import { Innerroutertest } from './innerroutertest/innerroutertest'
import { Inner1 } from './innerroutertest/inner1/inner1'
import { Inner2 } from './innerroutertest/inner2/inner2'

export const routes: Routes = [
  {path: '', redirectTo: '/planning-overview', pathMatch: 'full'},
  {path: 'planning-overview', component: PlanningOverview},
  {path: 'site-management', component: SiteManagement,
    children: [
        { path: '', redirectTo: 'open-overview', pathMatch: 'full' },
        { path: 'open-overview', component: OpenSiteOverview },
        { path: 'createSite', component: CreateSite },
      ]},
  {path: 'innerroutertest', component: Innerroutertest,
    children: [
      { path: '', redirectTo: 'inner1', pathMatch: 'full' },
      { path: 'inner1', component: Inner1 },
      { path: 'inner2', component: Inner2 },
      ]},
 ];
