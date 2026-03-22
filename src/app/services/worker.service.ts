import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    return this.http.post<WorkerResponse>('/api/workers', {
      first_name: worker.firstName,
      last_name: worker.lastName,
    }).pipe(
      tap(() => this.refresh()),
      map(toWorker),
    );
  }

  updateWorker(worker: Worker): Observable<Worker> {
    return this.http.put<WorkerResponse>(`/api/workers/${worker.id}`, {
      first_name: worker.firstName,
      last_name: worker.lastName,
    }).pipe(
      map(toWorker),
      tap(updated => this.workersSubject.next(
        this.workersSubject.value.map(w => w.id === updated.id ? updated : w),
      )),
    );
  }

  deleteWorker(id: number): Observable<void> {
    this.workersSubject.next(this.workersSubject.value.filter(w => w.id !== id));
    return of(void 0);
  }
}
