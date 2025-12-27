import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planning, Week, UnplannedSite } from './domain'

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
  unplannedSites = signal<UnplannedSite[]>([])

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
        console.log(result);
        this.unplannedSites.set(result);
    });
  }

}
