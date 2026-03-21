import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../services/site.service';
import { WorkerService } from '../../services/worker.service';
import { Site } from '../../models/site.model';
import { Worker } from '../../models/worker.model';
import { SiteEditModalComponent } from '../../shared/site-edit-modal/site-edit-modal.component';
import { WorkerEditModalComponent } from '../../shared/worker-edit-modal/worker-edit-modal.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [ReactiveFormsModule, SiteEditModalComponent, WorkerEditModalComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
})
export class ManagementComponent {
  private siteService = inject(SiteService);
  private workerService = inject(WorkerService);

  sites = toSignal(this.siteService.getSites(), { initialValue: [] as Site[] });
  workers = toSignal(this.workerService.getWorkers(), { initialValue: [] as Worker[] });

  editingSite = signal<Site | null>(null);
  siteModalOpen = signal(false);

  editingWorker = signal<Worker | null>(null);
  workerModalOpen = signal(false);

  siteForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    isPrivateCustomer: new FormControl(false),
    desiredDate: new FormControl<string | null>(null),
    durationInDays: new FormControl<number | null>(null),
    transport: new FormControl<string | null>(null),
  });

  workerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  onAddSite(): void {
    if (this.siteForm.invalid) return;
    const v = this.siteForm.value;
    this.siteService.addSite({
      name: v.name!,
      customerName: v.customerName!,
      isPrivateCustomer: v.isPrivateCustomer ?? false,
      desiredDate: v.desiredDate ?? null,
      durationInDays: v.durationInDays ?? null,
      transport: v.transport ?? null,
      status: 'OPEN',
    }).subscribe();
    this.siteForm.reset({ isPrivateCustomer: false });
  }

  onAddWorker(): void {
    if (this.workerForm.invalid) return;
    const v = this.workerForm.value;
    this.workerService.addWorker({ firstName: v.firstName!, lastName: v.lastName! }).subscribe();
    this.workerForm.reset();
  }

  deleteWorker(id: number): void {
    this.workerService.deleteWorker(id).subscribe();
  }

  openSiteModal(site: Site): void {
    this.editingSite.set(site);
    this.siteModalOpen.set(true);
  }

  closeSiteModal(): void {
    this.siteModalOpen.set(false);
    this.editingSite.set(null);
  }

  onSiteSave(site: Site): void {
    this.siteService.updateSite(site).subscribe();
    this.closeSiteModal();
  }

  openWorkerModal(worker: Worker): void {
    this.editingWorker.set(worker);
    this.workerModalOpen.set(true);
  }

  closeWorkerModal(): void {
    this.workerModalOpen.set(false);
    this.editingWorker.set(null);
  }

  onWorkerSave(worker: Worker): void {
    this.workerService.updateWorker(worker).subscribe();
    this.closeWorkerModal();
  }
}
