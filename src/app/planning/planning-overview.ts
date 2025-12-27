import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planning, Week, UnplannedSite, SiteView, Day } from './domain';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';

@Component({
  selector: 'planning-overview',
  standalone: true,
  imports: [CdkDropList, CdkDrag ],
  templateUrl: './planning.html',
  styleUrl: './planning.css',
})
export class PlanningOverview {
  private client = inject(HttpClient);

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
  }

}
