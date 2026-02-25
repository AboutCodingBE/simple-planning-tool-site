import { Component, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkerDayOverview, WorkerDayDetail } from './dto';

@Component({
  selector: 'app-dayplanning',
  imports: [],
  templateUrl: './dayplanning.html',
  styleUrl: './dayplanning.css',
})
export class Dayplanning {
  private http = inject(HttpClient);

  planningDate = signal<string>(this.getTodayDate());
  dayDetails = signal<WorkerDayDetail[]>([]);


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
      this.http.get<WorkerDayOverview>(`/api/planning/worker/day?date=${this.planningDate()}`)
        .subscribe(result => {
          console.log(result);
          this.dayDetails.set(result.day_overview);
        });
    }
}
