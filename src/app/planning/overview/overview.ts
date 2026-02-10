import { Component, inject, signal } from '@angular/core';
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
  unplannedSites = signal<SiteView[]>([])

  ngOnInit() {
    this.getDefaultPlanning();
    this.getUnplannedSites();
  }

  getDefaultPlanning() {
      this.client.get<Planning>(`http://localhost:8080/planning`).subscribe(result => {
        console.log(result.weeks);
        this.planningWeeks.set(result.weeks);
      });
  }

  getUnplannedSites() {
    this.client.get<UnplannedSite[]>('http://localhost:8080/sites/unplanned')
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
    this.client.patch(`http://localhost:8080/planning/sites/${siteId}?date=${executionDate}`, null)
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
  //     if (!event.defaultPrevented) {
  //         this.router.navigate(['detail-planning', siteId, date]);
  //     }
    }
}
