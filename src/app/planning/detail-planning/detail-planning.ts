import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SiteDetail, WorkerDetail, IdleWorkers } from './domain'
import {CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-detail-planning',
  imports: [CdkDrag, CdkDropList],
  templateUrl: './detail-planning.html',
  styleUrl: './detail-planning.css',
})
export class DetailPlanning {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  siteDetail = signal<SiteDetail | null>(null);
  linkedWorkers = signal<WorkerDetail[] | null>(null);
  idleWorkers = signal<WorkerDetail[] | null>(null);
  private siteId!: string | null;
  private planningDate!: string | null;

  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get("id");
    this.planningDate = this.route.snapshot.paramMap.get("date");
    this.getSiteDetail();
    this.getIdleWorkers();
  }

  getSiteDetail() {
    this.http.get<SiteDetail>(`http://localhost:8080/sites/${this.siteId}`)
      .subscribe(result => {
        console.log(result);
        this.siteDetail.set(result);
        this.linkedWorkers.set(result.workers);
      });
  }

  getIdleWorkers() {
    this.http.get<IdleWorkers>(`http://localhost:8080/planning/idle?date=${this.planningDate}`)
      .subscribe(result => {
        console.log(result);
        this.idleWorkers.set(result.idle_workers);
      });
  }

  link(event: CdkDragDrop<WorkerDetail[]>) {
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

    const workerId = event.container.data[event.currentIndex].id;
    console.log(workerId)
    this.linkWorker(workerId);
  }

  linkWorker(workerId: number) {
    this.http.patch(`http://localhost:8080/planning/sites/${this.siteId}/workers?workerId=${workerId}`, null)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  unlink(event: CdkDragDrop<WorkerDetail[]>) {
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

    const workerId = event.container.data[event.currentIndex].id;
    console.log(workerId)
    this.unlinkWorker(workerId);
  }

  unlinkWorker(workerId: number) {
    this.http.patch(`http://localhost:8080/planning/sites/${this.siteId}/unlink?workerId=${workerId}`, null)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  toPlanningOverview() {
    this.router.navigate(['planning-overview']);
  }
}
