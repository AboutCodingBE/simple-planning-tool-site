import { Component, signal, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DayOverview, PlannedSites } from './dto';

@Component({
  selector: 'app-site-dayplanning',
  imports: [],
  templateUrl: './site-dayplanning.html',
  styleUrl: './site-dayplanning.css',
})
export class SiteDayplanning {
  private http = inject(HttpClient);

  planningDate = signal<string>(this.getTodayDate());
  plannedSites = signal<PlannedSites[]>([]);

  constructor() {
    // Effect for future changes
    effect(() => {
      const date = this.planningDate();
      if (date) {  // Guard against initial empty state if needed
        this.fetchDataForDate();
      }
    });
  }

  private getTodayDate(): string {
      return new Date().toISOString().split('T')[0];
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.planningDate.set(input.value);
  }

  fetchDataForDate() {
    this.http.get<DayOverview>(`http://localhost:8080/planning/day?date=${this.planningDate()}`)
      .subscribe(result => {
        console.log(result);
        this.plannedSites.set(result.plannedSites);
      });
  }
}
