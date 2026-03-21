import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Worker } from '../models/worker.model';

const MOCK_WORKERS: Worker[] = [
  { id: 1, firstName: 'Luc', lastName: 'Vermeersch' },
  { id: 2, firstName: 'Joris', lastName: 'De Smedt' },
  { id: 3, firstName: 'Pieter', lastName: 'Van den Berg' },
  { id: 4, firstName: 'Michiel', lastName: 'Claeys' },
  { id: 5, firstName: 'Thomas', lastName: 'Bogaert' },
  { id: 6, firstName: 'Kevin', lastName: 'Maes' },
  { id: 7, firstName: 'Bram', lastName: 'Declercq' },
  { id: 8, firstName: 'Jonas', lastName: 'Willems' },
  { id: 9, firstName: 'Stef', lastName: 'Hermans' },
  { id: 10, firstName: 'Wout', lastName: 'Peeters' },
];

@Injectable({ providedIn: 'root' })
export class WorkerService {
  private workersSubject = new BehaviorSubject<Worker[]>(MOCK_WORKERS);
  private nextId = MOCK_WORKERS.length + 1;

  getWorkers(): Observable<Worker[]> {
    return this.workersSubject.asObservable();
  }

  getWorkerById(id: number): Observable<Worker | undefined> {
    return of(this.workersSubject.value.find(w => w.id === id));
  }

  addWorker(worker: Omit<Worker, 'id'>): Observable<Worker> {
    const newWorker: Worker = { ...worker, id: this.nextId++ };
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
