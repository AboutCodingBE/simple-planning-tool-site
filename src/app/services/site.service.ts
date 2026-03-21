import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Site } from '../models/site.model';

// ── API response shapes ───────────────────────────────────────────────────────

interface CustomerResponse {
  id: number;
  customer_name: string;
  is_private_customer: boolean;
}

interface SiteResponse {
  id: number;
  name: string;
  customer: CustomerResponse | null;
  desired_date: string | null;
  planned_date: string | null;
  duration_in_days: number | null;
  status: string;
  transport: string | null;
}

interface CreateSiteRequest {
  name: string;
  customer_name: string;
  is_private_customer: boolean;
  desired_date: string | null;
  duration_in_days: number | null;
  transport: string | null;
}

interface UpdateSiteRequest extends CreateSiteRequest {}

// ── Mapper ────────────────────────────────────────────────────────────────────

function toSite(r: SiteResponse): Site {
  return {
    id: r.id,
    name: r.name,
    customerName: r.customer?.customer_name ?? '',
    isPrivateCustomer: r.customer?.is_private_customer ?? false,
    desiredDate: r.desired_date,
    durationInDays: r.duration_in_days,
    transport: r.transport,
    status: r.status as Site['status'],
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class SiteService {
  private http = inject(HttpClient);
  private sitesSubject = new BehaviorSubject<Site[]>([]);

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.http.get<SiteResponse[]>('/api/sites/open').pipe(
      map(sites => sites.map(toSite)),
    ).subscribe(sites => this.sitesSubject.next(sites));
  }

  getSites(): Observable<Site[]> {
    return this.sitesSubject.asObservable();
  }

  getSiteById(id: number): Observable<Site | undefined> {
    return of(this.sitesSubject.value.find(s => s.id === id));
  }

  addSite(site: Omit<Site, 'id'>): Observable<Site> {
    const body: CreateSiteRequest = {
      name: site.name,
      customer_name: site.customerName,
      is_private_customer: site.isPrivateCustomer,
      desired_date: site.desiredDate,
      duration_in_days: site.durationInDays,
      transport: site.transport,
    };
    return this.http.post<SiteResponse>('/api/sites', body).pipe(
      map(toSite),
      tap(newSite => this.sitesSubject.next([...this.sitesSubject.value, newSite])),
    );
  }

  updateSite(site: Site): Observable<Site> {
    const body: UpdateSiteRequest = {
      name: site.name,
      customer_name: site.customerName,
      is_private_customer: site.isPrivateCustomer,
      desired_date: site.desiredDate,
      duration_in_days: site.durationInDays,
      transport: site.transport,
    };
    return this.http.put<SiteResponse>(`/api/sites/${site.id}`, body).pipe(
      map(toSite),
      tap(updated => this.sitesSubject.next(
        this.sitesSubject.value.map(s => s.id === updated.id ? updated : s),
      )),
    );
  }
}
