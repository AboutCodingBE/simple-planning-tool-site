import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Worker } from '../models/worker.model';

interface WorkerResponse {
  id: number;
  first_name: string;
  last_name: string;
  date_of_creation: string;
}

function toWorker(r: WorkerResponse): Worker {
  return { id: r.id, firstName: r.first_name, lastName: r.last_name };
}

@Injectable({ providedIn: 'root' })
export class WorkerService {
  private http = inject(HttpClient);
  private workersSubject = new BehaviorSubject<Worker[]>([]);

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.http.get<WorkerResponse[]>('/api/workers').pipe(
      map(workers => workers.map(toWorker)),
    ).subscribe(workers => this.workersSubject.next(workers));
  }

  getWorkers(): Observable<Worker[]> {
    return this.workersSubject.asObservable();
  }

  getWorkerById(id: number): Observable<Worker | undefined> {
    return of(this.workersSubject.value.find(w => w.id === id));
  }

  addWorker(worker: Omit<Worker, 'id'>): Observable<Worker> {
    // TODO: replace with POST /api/workers
    const newWorker: Worker = { ...worker, id: Date.now() };
    this.workersSubject.next([...this.workersSubject.value, newWorker]);
    return of(newWorker);
  }

  updateWorker(worker: Worker): Observable<Worker> {
    const updated = this.workersSubject.value.map(w => w.id === worker.id ? worker : w);
    this.workersSubject.next(updated);
    return of(worker);
  }

  deleteWorker(id: number): Observable<void> {
    this.workersSubject.next(this.workersSubject.value.filter(w => w.id !== id));
    return of(void 0);
  }
}
