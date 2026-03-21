import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Site } from '../models/site.model';

const MOCK_SITES: Site[] = [
  {
    id: 1, name: 'Renovatie Dijkstraat', customerName: 'Vermeersch NV',
    isPrivateCustomer: false, desiredDate: '2026-04-01', durationInDays: 5,
    transport: 'Bestelwagen', status: 'OPEN',
  },
  {
    id: 2, name: 'Nieuwbouw Kerkplein', customerName: 'De Groote Familie',
    isPrivateCustomer: true, desiredDate: '2026-04-15', durationInDays: 10,
    transport: 'Vrachtwagen', status: 'OPEN',
  },
  {
    id: 3, name: 'Dakwerken Stationsweg', customerName: 'Gemeente Aalst',
    isPrivateCustomer: false, desiredDate: '2026-03-28', durationInDays: 3,
    transport: 'Bestelwagen', status: 'OPEN',
  },
  {
    id: 4, name: 'Verbouwing Handelspand', customerName: 'Bakkerij Janssen',
    isPrivateCustomer: true, desiredDate: '2026-05-01', durationInDays: 7,
    transport: null, status: 'OPEN',
  },
  {
    id: 5, name: 'Betonwerken Industriepark', customerName: 'LogiPark BVBA',
    isPrivateCustomer: false, desiredDate: '2026-04-20', durationInDays: 14,
    transport: 'Vrachtwagen', status: 'OPEN',
  },
  {
    id: 6, name: 'Gevelrenovatie Marktplein', customerName: 'Stad Gent',
    isPrivateCustomer: false, desiredDate: '2026-03-25', durationInDays: 4,
    transport: 'Bestelwagen', status: 'OPEN',
  },
  {
    id: 7, name: 'Terrasaanleg Tuinwijk', customerName: 'Peters Patrick',
    isPrivateCustomer: true, desiredDate: '2026-04-10', durationInDays: 2,
    transport: null, status: 'OPEN',
  },
  {
    id: 8, name: 'Rioleringswerken Molenstraat', customerName: 'Aquafin NV',
    isPrivateCustomer: false, desiredDate: '2026-05-15', durationInDays: 20,
    transport: 'Vrachtwagen', status: 'OPEN',
  },
];

@Injectable({ providedIn: 'root' })
export class SiteService {
  private sitesSubject = new BehaviorSubject<Site[]>(MOCK_SITES);
  private nextId = MOCK_SITES.length + 1;

  getSites(): Observable<Site[]> {
    return this.sitesSubject.asObservable();
  }

  getSiteById(id: number): Observable<Site | undefined> {
    return of(this.sitesSubject.value.find(s => s.id === id));
  }

  addSite(site: Omit<Site, 'id'>): Observable<Site> {
    const newSite: Site = { ...site, id: this.nextId++ };
    this.sitesSubject.next([...this.sitesSubject.value, newSite]);
    return of(newSite);
  }

  updateSite(site: Site): Observable<Site> {
    const updated = this.sitesSubject.value.map(s => s.id === site.id ? site : s);
    this.sitesSubject.next(updated);
    return of(site);
  }
}
