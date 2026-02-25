import { Component, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Planning, Week, UnplannedSite, SiteView, Day } from '../domain';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CdkDropList, CdkDrag ],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  private client = inject(HttpClient);
  private router = inject(Router);

  planningWeeks = signal<Week[]>([]);
  unplannedSites = signal<SiteView[]>([]);

  fromDate = signal<string>(this.getTodayDate());
  untilDate = signal<string>(this.getTodayDate(30));

  dateError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const from = new Date(this.fromDate());
      const until = new Date(this.untilDate());

      if (from >= until) {
        this.dateError.set('Start datum is gelijk aan of na de eind datum');
      }
      else if (until < from) {
        this.dateError.set('Einddatum is voor de start datum');
      }else {
        this.dateError.set(null);
        if (!this.dateError()) {
          this.getPlanning();
        }
      }
    });
  }

  ngOnInit() {
    if (!this.dateError()) {
        this.getPlanning();
      }
    this.getUnplannedSites();
  }

  private getTodayDate(daysToAdd: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }

  onFromDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fromDate.set(input.value);
  }

  onUntilDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.untilDate.set(input.value);
  }

  isPastDate(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  getPlanning() {
      this.client.get<Planning>(`/api/planning?from=${this.fromDate()}&until=${this.untilDate()}`).subscribe(result => {
        console.log(result.weeks);
        this.planningWeeks.set(result.weeks);
      });
  }

  getUnplannedSites() {
    this.client.get<UnplannedSite[]>('/api/sites/unplanned')
      .subscribe(result => {
        const siteViews: SiteView[] = result.map(site => ({
          id: site.id,
          name: site.name,
          duration_in_days: site.duration_in_days,
          status: 'OPEN'
        }));
        this.unplannedSites.set(siteViews);
    });
  }

  planSite(siteId: number, executionDate: string) {
    this.client.patch(`/api/planning/sites/${siteId}?date=${executionDate}`, null)
      .subscribe(result => {
        console.log('Updated:', result);
      });
  }

  private getDaysFromWeek(week: Week): Day[] {
      return [
        week.monday,
        week.tuesday,
        week.wednesday,
        week.thursday,
        week.friday,
        week.saturday,
        week.sunday
      ];
  }

  getConnectedLists(): string[] {
    const allDayIds = this.planningWeeks()
      .flatMap(week => this.getDaysFromWeek(week))
      .map(day => day.date);

    return ['unplanned', ...allDayIds];
  }

  getConnectedListsExcludingPast(): string[] {
    return this.getConnectedLists().filter(listId => !this.isPastDate(listId));
  }

  canDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return !this.isPastDate(drop.id);
  };

  drop(event: CdkDragDrop<SiteView[]>) {
    console.log(event);
    console.log(event.container.element.nativeElement.id)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const siteId = event.container.data[event.currentIndex].id;
    const executionDate = event.container.element.nativeElement.id;
    this.planSite(siteId, executionDate);
  }

    toDetailPlanning(siteId: number, date: string) {
      this.router.navigate(['detail-planning', siteId, date]);
    }
}
