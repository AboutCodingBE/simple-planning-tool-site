# Use Case

Build an Angular 21+ planning tool application for managing construction site schedules and worker assignments. The application has four pages accessible via a shared sidebar navigation: Maand Overzicht (monthly planning), Detail Overzicht (detailed day-by-day view), Dag Planning (daily worker assignment), and Beheer (management of sites and workers).

The input of this use case:
User interactions through the browser UI — navigation clicks, drag-and-drop operations, form submissions, date selections.

Input mechanism of this use case:
Angular standalone components with Angular Router for page navigation. User input through Angular template-driven or reactive forms and native HTML5 drag-and-drop events.

The output of this feature:
A fully routed Angular application with styled components matching the wireframe design (dark sidebar, light main area, blue accents, DM Sans font). All UI elements render and are interactive. Modals open and close. Drag-and-drop zones highlight on hover. Forms validate required fields and disable submit buttons when invalid. Data is managed through Angular services with in-memory mock data, designed to be swapped for HTTP calls later.

# Business Rules

- Navigation: clicking a sidebar button routes to the corresponding page. The active page is highlighted in the sidebar.
- Maand Overzicht: displays 3 months starting from the current month. Each month card shows ISO week numbers. Each week row has 5 drop slot columns. Each slot accepts multiple site tags (max 5 per slot). Dropped tags show a remove (×) button. Sites panel on the right lists all available sites as draggable tags.
- Detail Overzicht: date range defaults to current week + 4 weeks. The grid shows 7-day rows (Ma–Zo) grouped by week. Each day card has a fixed height (~150px) and accepts up to 5 draggable site tags with remove buttons. A week sidebar next to each row displays the sites planned for that week (from Maand Overzicht data). Today's date gets a highlighted border.
- Dag Planning: date defaults to today. Shows one card per site planned for the selected day, laid out in a 2-column grid. Each card has a drop zone for worker tags (unlimited). Workers panel on the right lists all workers as draggable green tags. Dropped workers show a remove button. When no sites are planned, show an empty state with a "Plan een werf" button that navigates to Maand Overzicht.
- Beheer: side-by-side panels for Sites and Workers. Each panel has an inline form above a data table. Sites form fields: Werf naam* (required), Klant naam* (required), Gewenste uitvoeringsdatum, Duur (Dagen), Transport, Privé klant? (checkbox). Workers form fields: Voornaam* (required), Familienaam* (required). Submit buttons are disabled until all required fields are filled. Both tables have an edit icon (✎) that opens a modal. Workers additionally have a delete (×) button. Sites cannot be deleted.
- Site edit modal: pre-fills all 6 fields, has Opslaan and Annuleren buttons, closes on backdrop click.
- Worker edit modal: pre-fills Voornaam and Familienaam, has Opslaan and Annuleren buttons, green accent, closes on backdrop click.

# Data Models

Check the models.md file. 

# Component Overview

## AppComponent

Root component. Contains the sidebar and a `<router-outlet>` for page content.

The layout uses a flex row: sidebar (fixed 220px width) on the left, main content area (flex: 1) on the right. The main content area includes a page header with a dynamic title and subtitle.

This component depends on:
- Angular Router
- SidebarComponent

## SidebarComponent

Shared sidebar navigation rendered in every page view. Displays the logo (icon + text), a divider, and 4 navigation buttons. Highlights the currently active route. Uses `routerLink` and `routerLinkActive` for navigation.

Navigation items:
- Maand Overzicht → `/month-overview`
- Detail Overzicht → `/detail-overview`
- Dag Planning → `/day-planning`
- Beheer → `/management`

This component depends on:
- Angular Router (routerLink, routerLinkActive)

## MonthOverviewComponent

Page component for the monthly planning view. Displays 3 month cards (current month + next 2), each showing week numbers with 5 drop slots per week. A sites panel on the right lists all sites as draggable tags.

The input of this component:
- Sites list from SiteService

The output of this component:
- Updated week plans saved to PlanningService

This component depends on:
- SiteService
- PlanningService
- SiteTagComponent
- DropSlotComponent

## DetailOverviewComponent

Page component for the detailed day-by-day planning view. Displays a date range toolbar (Van/tot) and a scrollable grid of day cards grouped by week. Each week row has a sidebar showing planned sites for that week.

The input of this component:
- Date range (defaults to current week + 4 weeks)
- Week plans from PlanningService

The output of this component:
- Day-level site assignments saved to PlanningService

This component depends on:
- PlanningService
- SiteTagComponent

## DayPlanningComponent

Page component for daily worker assignment. Displays a date picker and a grid of site cards (2 columns) for the selected day. Each card accepts worker tags via drag-and-drop. A workers panel on the right lists all workers.

The input of this component:
- Selected date (defaults to today)
- Day plan from PlanningService
- Workers list from WorkerService

The output of this component:
- Worker-to-site assignments saved to PlanningService

This component depends on:
- PlanningService
- WorkerService
- WorkerTagComponent

## ManagementComponent

Page component for managing sites and workers. Two side-by-side panels, each with an inline form and a data table.

The input of this component:
- Sites list from SiteService
- Workers list from WorkerService

The output of this component:
- New/updated sites saved to SiteService
- New/updated/deleted workers saved to WorkerService

This component depends on:
- SiteService
- WorkerService
- SiteEditModalComponent
- WorkerEditModalComponent

## SiteEditModalComponent

Modal dialog for editing a site. Receives a Site object, displays all 6 fields pre-filled, emits save or cancel events. Closes on backdrop click or cancel button.

The input of this component:
- `site: Site` — the site to edit
- `isOpen: boolean` — controls visibility

The output of this component:
- `save: EventEmitter<Site>` — emits updated site
- `cancel: EventEmitter<void>` — emits on cancel/close

This component depends on:
- Angular ReactiveFormsModule

## WorkerEditModalComponent

Modal dialog for editing a worker. Receives a Worker object, displays Voornaam and Familienaam pre-filled, emits save or cancel events. Uses green accent styling.

The input of this component:
- `worker: Worker` — the worker to edit
- `isOpen: boolean` — controls visibility

The output of this component:
- `save: EventEmitter<Worker>` — emits updated worker
- `cancel: EventEmitter<void>` — emits on cancel/close

This component depends on:
- Angular ReactiveFormsModule

## SiteTagComponent

Reusable draggable tag displaying a site name. Blue styling. When used inside a drop zone, shows a remove (×) button.

The input of this component:
- `site: Site` — the site to display
- `removable: boolean` — whether to show remove button (default false)

The output of this component:
- `remove: EventEmitter<Site>` — emits when × is clicked
- HTML5 dragstart event with site data

## WorkerTagComponent

Reusable draggable tag displaying a worker name. Green styling. When used inside a drop zone, shows a remove (×) button.

The input of this component:
- `worker: Worker` — the worker to display
- `removable: boolean` — whether to show remove button (default false)

The output of this component:
- `remove: EventEmitter<Worker>` — emits when × is clicked
- HTML5 dragstart event with worker data

## DropSlotComponent

Reusable drop zone that accepts dragged tags. Highlights on dragover. Emits dropped data.

The input of this component:
- `maxItems: number` — maximum items allowed (default 5)
- `items: any[]` — current items in the slot

The output of this component:
- `itemDropped: EventEmitter<string>` — emits the dropped data string

## SiteService

Angular injectable service managing the sites collection. Provides CRUD operations. Uses in-memory mock data initially, designed for easy swap to HttpClient later.

```typescript
@Injectable({ providedIn: 'root' })
class SiteService {
  getSites(): Observable<Site[]>
  getSiteById(id: string): Observable<Site | undefined>
  addSite(site: Omit<Site, 'id'>): Observable<Site>
  updateSite(site: Site): Observable<Site>
}
```

Initial mock data: 8 Belgian construction sites with realistic names, clients, dates, and durations.

This component depends on: nothing (root service)

## WorkerService

Angular injectable service managing the workers collection. Provides CRUD operations including delete.

```typescript
@Injectable({ providedIn: 'root' })
class WorkerService {
  getWorkers(): Observable<Worker[]>
  getWorkerById(id: string): Observable<Worker | undefined>
  addWorker(worker: Omit<Worker, 'id'>): Observable<Worker>
  updateWorker(worker: Worker): Observable<Worker>
  deleteWorker(id: string): Observable<void>
}
```

Initial mock data: 10 Belgian worker names (first + last).

This component depends on: nothing (root service)

## PlanningService

Angular injectable service managing the planning state — week plans, day plans, and worker assignments. Provides methods to assign sites to weeks/days and workers to day-sites.

```typescript
@Injectable({ providedIn: 'root' })
class PlanningService {
  getWeekPlans(): Observable<WeekPlan[]>
  assignSiteToWeek(weekNumber: number, slotIndex: number, site: Site): void
  removeSiteFromWeek(weekNumber: number, slotIndex: number, site: Site): void

  getDayPlan(date: string): Observable<DayPlan>
  assignSiteToDay(date: string, site: Site): void
  removeSiteFromDay(date: string, site: Site): void

  assignWorkerToSite(date: string, siteId: string, worker: Worker): void
  removeWorkerFromSite(date: string, siteId: string, workerId: string): void
}
```

Initial mock data: a few weeks pre-populated with site assignments, today and tomorrow with day plans.

This component depends on:
- SiteService (for resolving site references)
- WorkerService (for resolving worker references)

# Styling Specification

## Global

- Font: `DM Sans` from Google Fonts, fallback to `-apple-system, BlinkMacSystemFont, sans-serif`
- Anti-aliasing: `-webkit-font-smoothing: antialiased`
- Base background: `#f0f4f8`
- Border radius: 10px for cards, 6px for smaller elements

## CSS Variables (define in styles.css)

```css
:root {
  /* Sidebar */
  --sb-bg: #1a2234;
  --sb-bg-hover: #232f45;
  --sb-bg-active: #2a3a56;
  --sb-text: #8896ad;
  --sb-text-active: #e4eaf5;
  --sb-divider: #2a3650;
  --sb-accent: #4d8df7;

  /* Main */
  --bg: #f0f4f8;
  --card-bg: #ffffff;
  --text: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --border-light: #f1f5f9;

  /* Blues */
  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-400: #60a5fa;
  --blue-500: #4d8df7;
  --blue-600: #2563eb;

  /* Tags */
  --tag-bg: #eff6ff;
  --tag-border: #bfdbfe;
  --tag-text: #1e40af;

  /* Worker tags (green) */
  --worker-tag-bg: #f0fdf4;
  --worker-tag-border: #bbf7d0;
  --worker-tag-text: #166534;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.08);
}
```

## Key Visual Patterns

- Card headers: gradient wash `linear-gradient(to right, var(--blue-50), transparent)` with a 4px blue accent bar via `::before` pseudo-element
- Worker panels: same pattern but with green (`#f0fdf4` gradient, `#22c55e` accent bar)
- Drop zones: dashed border (`1.5px dashed`), highlight to solid blue on dragover with `box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15)`
- Tags: subtle lift on hover (`translateY(-1px)` + shadow increase)
- Modals: backdrop with `rgba(15, 23, 42, 0.45)` + `backdrop-filter: blur(4px)`, modal animates in with scale + fade
- Tables: sticky headers, row hover highlight, muted uppercase column headers
- Buttons: disabled state uses `#c5cdd8` background with `cursor: not-allowed`
- Scrollbars: thin (5px), rounded, subtle grey

# Routing Configuration

```typescript
const routes: Routes = [
  { path: '', redirectTo: 'month-overview', pathMatch: 'full' },
  { path: 'month-overview', component: MonthOverviewComponent },
  { path: 'detail-overview', component: DetailOverviewComponent },
  { path: 'day-planning', component: DayPlanningComponent },
  { path: 'management', component: ManagementComponent },
];
```

# Project Structure

```
src/
├── app/
│   ├── app.component.ts          # Root with sidebar + router-outlet
│   ├── app.routes.ts              # Route configuration
│   ├── models/
│   │   ├── site.model.ts
│   │   ├── worker.model.ts
│   │   └── planning.model.ts     # WeekPlan, DayPlan, DayAssignment
│   ├── services/
│   │   ├── site.service.ts
│   │   ├── worker.service.ts
│   │   └── planning.service.ts
│   ├── shared/
│   │   ├── sidebar/
│   │   │   └── sidebar.component.ts
│   │   ├── site-tag/
│   │   │   └── site-tag.component.ts
│   │   ├── worker-tag/
│   │   │   └── worker-tag.component.ts
│   │   ├── drop-slot/
│   │   │   └── drop-slot.component.ts
│   │   ├── site-edit-modal/
│   │   │   └── site-edit-modal.component.ts
│   │   └── worker-edit-modal/
│   │       └── worker-edit-modal.component.ts
│   └── pages/
│       ├── month-overview/
│       │   └── month-overview.component.ts
│       ├── detail-overview/
│       │   └── detail-overview.component.ts
│       ├── day-planning/
│       │   └── day-planning.component.ts
│       └── management/
│           └── management.component.ts
└── styles.css                     # Global styles + CSS variables
```

# Implementation Notes

- Use Angular 17+ standalone components (no NgModules).
- Use plain CSS for all styles — no SCSS. Each component should have its styles inline or in a co-located `.css` file.
- Use Angular signals where appropriate for reactive state management.
- Services return Observables for consistency, even with in-memory data. This makes the HTTP swap seamless — just replace the `of()` calls with `this.http.get()` etc.
- Drag-and-drop uses native HTML5 API via `(dragstart)`, `(dragover)`, `(drop)`, `(dragleave)` event bindings. No external DnD library needed.
- All component class names and route paths are in English. The UI labels (button text, form labels, table headers) remain in Dutch as they are user-facing.
- The wireframe HTML file is included as a reference at `/mnt/user-data/outputs/planning-wireframe.html`. Claude Code should reference it for exact CSS values and layout details.
