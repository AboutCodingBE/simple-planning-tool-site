import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planning, Week } from './domain'

@Component({
  selector: 'planning-overview',
  standalone: true,
  imports: [],
  templateUrl: './planning.html',
  styleUrl: './planning.css',
})
export class PlanningOverview {
  private client = inject(HttpClient);

  planningWeeks = signal<Week[]>([]);

  ngOnInit() {
    this.getDefaultPlanning();
  }

  getDefaultPlanning() {
      this.client.get<Planning>(`http://localhost:8080/planning`).subscribe(result => {
        console.log(result.weeks);
        this.planningWeeks.set(result.weeks);
      });
    }

}
