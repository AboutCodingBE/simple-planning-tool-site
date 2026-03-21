import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="2"/>
            <line x1="9" y1="12" x2="15" y2="12"/>
            <line x1="9" y1="16" x2="12" y2="16"/>
          </svg>
        </div>
        <div class="sidebar-logo-text">
          Planning Tool
          <span>Werf beheer</span>
        </div>
      </div>

      <div class="sidebar-divider"></div>

      <nav class="sidebar-nav">
        <a routerLink="/month-overview" routerLinkActive="active">Maand Overzicht</a>
        <a routerLink="/detail-overview" routerLinkActive="active">Detail Overzicht</a>
        <a routerLink="/day-planning" routerLinkActive="active">Dag Planning</a>
        <a routerLink="/management" routerLinkActive="active">Beheer</a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-w);
      min-width: var(--sidebar-w);
      background: var(--sb-bg);
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .sidebar-logo {
      padding: 28px 24px 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .sidebar-logo-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--blue-500), var(--blue-400));
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(77, 141, 247, 0.35);
      flex-shrink: 0;
    }

    .sidebar-logo-icon svg {
      width: 20px;
      height: 20px;
    }

    .sidebar-logo-text {
      font-size: 16px;
      font-weight: 700;
      color: var(--sb-text-active);
      letter-spacing: -0.3px;
      line-height: 1.2;
    }

    .sidebar-logo-text span {
      display: block;
      font-size: 11px;
      font-weight: 400;
      color: var(--sb-text);
      margin-top: 1px;
      letter-spacing: 0;
    }

    .sidebar-divider {
      height: 1px;
      background: var(--sb-divider);
      margin: 0 20px 8px;
    }

    .sidebar-nav {
      padding: 4px 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sidebar-nav a {
      display: block;
      width: 100%;
      text-align: left;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 400;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--sb-text);
      font-family: inherit;
      border-radius: var(--radius-sm);
      transition: all 0.15s ease;
      letter-spacing: -0.1px;
      text-decoration: none;
    }

    .sidebar-nav a:hover {
      background: var(--sb-bg-hover);
      color: var(--sb-text-active);
    }

    .sidebar-nav a.active {
      background: var(--sb-bg-active);
      color: var(--sb-text-active);
      font-weight: 600;
      box-shadow: inset 3px 0 0 var(--sb-accent);
    }
  `],
})
export class SidebarComponent {}
