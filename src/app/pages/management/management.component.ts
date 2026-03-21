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
  template: `
    <div class="bh-content">

      <!-- Sites panel -->
      <div class="bh-panel">
        <div class="bh-panel-header">
          Werven
          <span class="bh-count">{{ sites().length }}</span>
        </div>

        <form class="bh-form-full" [formGroup]="siteForm" (ngSubmit)="onAddSite()">
          <div class="bh-form-row">
            <div class="bh-field bh-field-half">
              <label class="bh-label">Werf naam <span class="bh-required">*</span></label>
              <input class="bh-input" type="text" formControlName="name" placeholder="Naam werf" />
            </div>
            <div class="bh-field bh-field-half">
              <label class="bh-label">Klant naam <span class="bh-required">*</span></label>
              <input class="bh-input" type="text" formControlName="customerName" placeholder="Naam klant" />
            </div>
          </div>
          <div class="bh-form-row">
            <div class="bh-field bh-field-third">
              <label class="bh-label">Gewenste uitvoeringsdatum</label>
              <input class="bh-input" type="date" formControlName="desiredDate" />
            </div>
            <div class="bh-field bh-field-third">
              <label class="bh-label">Duur (Dagen)</label>
              <input class="bh-input" type="number" formControlName="durationInDays" min="1" placeholder="0" />
            </div>
            <div class="bh-field bh-field-third">
              <label class="bh-label">Transport</label>
              <input class="bh-input" type="text" formControlName="transport" placeholder="Bestelwagen…" />
            </div>
          </div>
          <div class="bh-form-row-footer">
            <label class="bh-checkbox-label">
              <input type="checkbox" formControlName="isPrivateCustomer" />
              Privé klant?
            </label>
            <button class="bh-add-btn" type="submit" [disabled]="siteForm.invalid">
              + Werf toevoegen
            </button>
          </div>
        </form>

        <div class="bh-table-wrap">
          <table class="bh-table">
            <thead>
              <tr>
                <th>Naam</th>
                <th>Klant</th>
                <th>Datum</th>
                <th>Dagen</th>
                <th>Transport</th>
                <th class="bh-col-privat">Privé</th>
                <th class="bh-col-action">Acties</th>
              </tr>
            </thead>
            <tbody>
              @for (site of sites(); track site.id) {
                <tr>
                  <td>{{ site.name }}</td>
                  <td>{{ site.customerName }}</td>
                  <td>{{ site.desiredDate ?? '—' }}</td>
                  <td>{{ site.durationInDays ?? '—' }}</td>
                  <td>{{ site.transport ?? '—' }}</td>
                  <td class="bh-col-privat">{{ site.isPrivateCustomer ? '✓' : '' }}</td>
                  <td class="bh-col-action">
                    <div class="bh-action-btns">
                      <button class="bh-edit-btn" type="button" title="Bewerken"
                              (click)="openSiteModal(site)">✎</button>
                    </div>
                  </td>
                </tr>
              }
              @if (sites().length === 0) {
                <tr><td colspan="7" class="bh-empty">Geen werven gevonden</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Workers panel -->
      <div class="bh-panel">
        <div class="bh-panel-header">
          Werkers
          <span class="bh-count">{{ workers().length }}</span>
        </div>

        <form class="bh-form-full" [formGroup]="workerForm" (ngSubmit)="onAddWorker()">
          <div class="bh-form-row">
            <div class="bh-field bh-field-half">
              <label class="bh-label">Voornaam <span class="bh-required">*</span></label>
              <input class="bh-input" type="text" formControlName="firstName" placeholder="Voornaam" />
            </div>
            <div class="bh-field bh-field-half">
              <label class="bh-label">Familienaam <span class="bh-required">*</span></label>
              <input class="bh-input" type="text" formControlName="lastName" placeholder="Familienaam" />
            </div>
          </div>
          <div class="bh-form-row-footer">
            <span></span>
            <button class="bh-add-btn bh-add-btn-green" type="submit" [disabled]="workerForm.invalid">
              + Werker toevoegen
            </button>
          </div>
        </form>

        <div class="bh-table-wrap">
          <table class="bh-table">
            <thead>
              <tr>
                <th>Voornaam</th>
                <th>Familienaam</th>
                <th class="bh-col-action">Acties</th>
              </tr>
            </thead>
            <tbody>
              @for (worker of workers(); track worker.id) {
                <tr>
                  <td>{{ worker.firstName }}</td>
                  <td>{{ worker.lastName }}</td>
                  <td class="bh-col-action">
                    <div class="bh-action-btns">
                      <button class="bh-edit-btn" type="button" title="Bewerken"
                              (click)="openWorkerModal(worker)">✎</button>
                      <button class="bh-delete-btn" type="button" title="Verwijderen"
                              (click)="deleteWorker(worker.id)">×</button>
                    </div>
                  </td>
                </tr>
              }
              @if (workers().length === 0) {
                <tr><td colspan="3" class="bh-empty">Geen werkers gevonden</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <app-site-edit-modal
      [site]="editingSite()"
      [isOpen]="siteModalOpen()"
      (save)="onSiteSave($event)"
      (cancel)="closeSiteModal()">
    </app-site-edit-modal>

    <app-worker-edit-modal
      [worker]="editingWorker()"
      [isOpen]="workerModalOpen()"
      (save)="onWorkerSave($event)"
      (cancel)="closeWorkerModal()">
    </app-worker-edit-modal>
  `,
  styles: [`
    .bh-content {
      flex: 1;
      display: flex;
      padding: 0 36px 36px;
      gap: 24px;
      overflow: hidden;
    }

    .bh-panel {
      flex: 1;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: fadeIn 0.35s ease both;
    }

    .bh-panel:nth-child(2) { animation-delay: 0.07s; }

    .bh-panel-header {
      padding: 14px 20px;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.2px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(to right, var(--blue-50), transparent);
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bh-panel-header::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background: var(--blue-500);
      border-radius: 2px;
    }

    .bh-panel:nth-child(2) .bh-panel-header {
      background: linear-gradient(to right, #f0fdf4, transparent);
    }

    .bh-panel:nth-child(2) .bh-panel-header::before { background: #22c55e; }

    .bh-count {
      font-size: 12px;
      font-weight: 600;
      background: var(--blue-100);
      color: var(--blue-600);
      padding: 2px 8px;
      border-radius: 10px;
    }

    .bh-panel:nth-child(2) .bh-count {
      background: #dcfce7;
      color: #166534;
    }

    .bh-form-full {
      padding: 16px;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bh-form-row {
      display: flex;
      gap: 12px;
    }

    .bh-form-row-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bh-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bh-field-half { flex: 1; }
    .bh-field-third { flex: 1; }

    .bh-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .bh-required { color: #ef4444; }

    .bh-checkbox-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--text-secondary);
      cursor: pointer;
      user-select: none;
    }

    .bh-checkbox-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: var(--blue-500);
      cursor: pointer;
    }

    .bh-input {
      flex: 1;
      font-family: inherit;
      font-size: 13px;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg);
      color: var(--text);
      outline: none;
      transition: border-color 0.15s;
    }

    .bh-input:focus {
      border-color: var(--blue-400);
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
      background: var(--card-bg);
    }

    .bh-input::placeholder { color: var(--text-muted); }

    .bh-add-btn {
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      background: var(--blue-500);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgba(77, 141, 247, 0.25);
      white-space: nowrap;
    }

    .bh-add-btn:hover:not(:disabled) {
      background: var(--blue-600);
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(77, 141, 247, 0.35);
    }

    .bh-add-btn:disabled {
      background: #c5cdd8;
      cursor: not-allowed;
      box-shadow: none;
    }

    .bh-add-btn-green {
      background: #22c55e;
      box-shadow: 0 1px 3px rgba(34, 197, 94, 0.25);
    }

    .bh-add-btn-green:hover:not(:disabled) {
      background: #16a34a;
      box-shadow: 0 2px 6px rgba(34, 197, 94, 0.35);
    }

    .bh-table-wrap {
      flex: 1;
      overflow-y: auto;
    }

    .bh-table {
      width: 100%;
      border-collapse: collapse;
    }

    .bh-table thead th {
      text-align: left;
      padding: 10px 16px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border);
      background: #fafcff;
      position: sticky;
      top: 0;
    }

    .bh-table tbody tr { transition: background 0.1s; }
    .bh-table tbody tr:hover { background: var(--blue-50); }
    .bh-panel:nth-child(2) .bh-table tbody tr:hover { background: #f0fdf4; }

    .bh-table tbody td {
      padding: 10px 16px;
      font-size: 13px;
      border-bottom: 1px solid var(--border-light);
      color: var(--text);
    }

    .bh-col-action {
      width: 80px;
      text-align: center !important;
    }

    .bh-col-privat {
      width: 60px;
      text-align: center !important;
    }

    .bh-action-btns {
      display: flex;
      gap: 4px;
      justify-content: center;
    }

    .bh-edit-btn,
    .bh-delete-btn {
      width: 28px;
      height: 28px;
      border: none;
      background: transparent;
      color: var(--text-muted);
      font-size: 14px;
      cursor: pointer;
      border-radius: var(--radius-sm);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .bh-edit-btn:hover {
      background: rgba(77, 141, 247, 0.1);
      color: var(--blue-500);
    }

    .bh-delete-btn:hover {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .bh-empty {
      padding: 30px 16px;
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
      font-style: italic;
    }
  `],
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
