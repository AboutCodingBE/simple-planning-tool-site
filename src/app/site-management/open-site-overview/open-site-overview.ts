import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteView } from './views'

@Component({
  selector: 'app-open-site-overview',
  imports: [],
  templateUrl: './open-site-overview.html',
  styleUrl: './open-site-overview.css',
})
export class OpenSiteOverview {
   private client = inject(HttpClient);

   sites = signal<SiteView[]>([]);

   ngOnInit() {
    this.getOverview();
   }

   getOverview() {
     this.client.get<SiteView[]>(`http://localhost:8080/sites`).subscribe(result => {
             console.log(result);
             this.sites.set(result);
           });
   }

}
