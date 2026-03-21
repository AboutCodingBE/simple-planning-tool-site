import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

interface PageMeta {
  title: string;
  subtitle: string;
}

const PAGE_META: Record<string, PageMeta> = {
  'month-overview': { title: 'Maand Overzicht', subtitle: 'Planningsbeheer per week' },
  'detail-overview': { title: 'Detail Overzicht', subtitle: 'Dag voor dag planningsoverzicht' },
  'day-planning': { title: 'Dag Planning', subtitle: 'Werkers toewijzen per werf' },
  'management': { title: 'Beheer', subtitle: 'Werven en werkers beheren' },
};

function segmentFromUrl(url: string): string {
  return url.split('/').filter(Boolean)[0] ?? '';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).url),
    ),
    { initialValue: this.router.url },
  );

  pageMeta = computed<PageMeta>(() => {
    const segment = segmentFromUrl(this.currentUrl());
    return PAGE_META[segment] ?? { title: 'Planning Tool', subtitle: '' };
  });
}
