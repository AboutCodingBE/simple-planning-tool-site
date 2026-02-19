# App Style Guide - Modern CRM (Pastel Gradient Theme)

## Color Palette

### Base Colors
- **Background Primary**: #F8F9FB (very light gray-blue)
- **Background Gradient**: Linear gradient from light blue to soft pink (#E8F0FF → #FFE8F0)
- **Sidebar Background**: #F5F6F8 (light gray)
- **Card Background**: #FFFFFF (white)
- **Card Background Alt**: rgba(255, 255, 255, 0.8) (semi-transparent white)

### Accent Colors
- **Primary Purple**: #6366F1 (indigo - main CTA color)
- **Blue**: #3B82F6 (info, active states)
- **Green/Teal**: #10B981 (success, positive metrics)
- **Mint Green**: #A7F3D0 (soft green for icons)
- **Orange**: #F97316 (warnings, alerts)
- **Red**: #EF4444 (errors, critical states)
- **Purple Badge**: #A855F7 (light purple for icons/badges)
- **Yellow**: #FCD34D (warnings, attention)

### Pastel Icon Backgrounds
- **Soft Blue**: #DBEAFE (light blue bubble)
- **Soft Pink**: #FECDD3 (light pink bubble)
- **Soft Green**: #D1FAE5 (light mint bubble)
- **Soft Purple**: #E9D5FF (light purple bubble)
- **Soft Yellow**: #FEF3C7 (light yellow bubble)
- **Soft Teal**: #CCFBF1 (light teal bubble)

### Text Colors
- **Text Primary**: #1F2937 (dark gray-black for headings)
- **Text Secondary**: #6B7280 (medium gray for body text)
- **Text Muted**: #9CA3AF (light gray for labels)
- **Text Success**: #10B981 (green for positive values)
- **Text Error**: #EF4444 (red for negative values)

### Border & Dividers
- **Border Light**: #E5E7EB (subtle borders)
- **Border Medium**: #D1D5DB (standard borders)
- **Divider**: #F3F4F6 (section dividers)

## Typography

- **Font Family**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Base Size**: 16px

### Headings
- **h1**: 2.25rem (36px), font-weight: 700, color: #1F2937
- **h2**: 1.875rem (30px), font-weight: 600, color: #1F2937
- **h3**: 1.5rem (24px), font-weight: 600, color: #1F2937
- **h4**: 1.25rem (20px), font-weight: 600, color: #1F2937

### Body Text
- **Large**: 1.125rem (18px), font-weight: 400, color: #6B7280
- **Regular**: 1rem (16px), font-weight: 400, color: #6B7280
- **Small**: 0.875rem (14px), font-weight: 400, color: #9CA3AF
- **Tiny**: 0.75rem (12px), font-weight: 400, color: #9CA3AF

### Numbers & Stats
- **Large Number**: 2.5rem (40px), font-weight: 700, color: #1F2937
- **Medium Number**: 1.875rem (30px), font-weight: 600, color: #1F2937
- **Small Number**: 1.25rem (20px), font-weight: 600, color: #1F2937

## Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## Component Patterns

### Page Background
```css
.page-background {
  background: linear-gradient(135deg, #E8F0FF 0%, #FFE8F0 100%);
  min-height: 100vh;
}

/* Alternative gradient for variety */
.page-background-alt {
  background: linear-gradient(135deg, #EEF2FF 0%, #FCE7F3 50%, #FEF3C7 100%);
}
```

### Sidebar
```css
.sidebar {
  background: #F5F6F8;
  width: 240px;
  padding: 24px 0;
  border-right: 1px solid #E5E7EB;
}

.sidebar-brand {
  padding: 0 20px 32px;
}

.sidebar-brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1F2937;
}

.sidebar-brand-tagline {
  font-size: 0.875rem;
  color: #9CA3AF;
  margin-top: 2px;
}

.sidebar-section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 16px 20px 8px;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  color: #6B7280;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 2px 8px;
  border-radius: 8px;
}

.sidebar-nav-item:hover {
  background: #FFFFFF;
  color: #1F2937;
}

.sidebar-nav-item.active {
  background: #FFF1F2;
  color: #6366F1;
  border-left: 3px solid #6366F1;
}

.sidebar-nav-icon {
  font-size: 1.125rem;
  opacity: 0.7;
}

.sidebar-nav-item.active .sidebar-nav-icon {
  opacity: 1;
  color: #6366F1;
}
```

### Stat Cards (Small)
```css
.stat-card-small {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.stat-card-small:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.stat-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.stat-card-label {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.stat-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

/* Icon background color variants */
.stat-card-icon.blue {
  background: #DBEAFE;
  color: #3B82F6;
}

.stat-card-icon.green {
  background: #D1FAE5;
  color: #10B981;
}

.stat-card-icon.purple {
  background: #E9D5FF;
  color: #A855F7;
}

.stat-card-icon.yellow {
  background: #FEF3C7;
  color: #F59E0B;
}

.stat-card-icon.red {
  background: #FEE2E2;
  color: #EF4444;
}

.stat-card-icon.teal {
  background: #CCFBF1;
  color: #14B8A6;
}

.stat-card-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  line-height: 1;
}

.stat-card-trend {
  font-size: 0.8125rem;
  color: #6B7280;
  margin-top: 4px;
}
```

### Large Hero Card
```css
.hero-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.hero-greeting {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
}

.hero-date {
  font-size: 1rem;
  color: #6B7280;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
```

### Section Cards (Dashboard Widgets)
```css
.section-card {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.section-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.section-icon.blue {
  background: #DBEAFE;
  color: #3B82F6;
}

.section-icon.yellow {
  background: #FEF3C7;
  color: #F59E0B;
}

.section-icon.red {
  background: #FEE2E2;
  color: #EF4444;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1F2937;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #9CA3AF;
  margin-top: 2px;
}
```

### Metric Cards (Inside Widgets)
```css
.metric-card {
  background: #F9FAFB;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}

.metric-label {
  font-size: 0.8125rem;
  color: #6B7280;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
}

.metric-value.orange {
  color: #F97316;
}

.metric-value.green {
  color: #10B981;
}

.metric-target {
  font-size: 0.75rem;
  color: #9CA3AF;
  margin-top: 4px;
}
```

### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #6366F1;
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  background: #4F46E5;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  transform: translateY(-1px);
}

.btn-secondary {
  background: #F3F4F6;
  color: #1F2937;
}

.btn-secondary:hover {
  background: #E5E7EB;
}

.btn-outline {
  background: transparent;
  color: #6366F1;
  border: 2px solid #6366F1;
}

.btn-outline:hover {
  background: rgba(99, 102, 241, 0.05);
}

.btn-icon-only {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
```

### Action Buttons (Icon with Text)
```css
.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.pause {
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.1);
}

.action-btn.pause:hover {
  background: rgba(245, 158, 11, 0.15);
}

.action-btn.resume {
  color: #10B981;
  background: rgba(16, 185, 129, 0.1);
}

.action-btn.resume:hover {
  background: rgba(16, 185, 129, 0.15);
}

.action-btn-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}
```

### Badges & Tags
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-success {
  background: #D1FAE5;
  color: #10B981;
}

.badge-warning {
  background: #FEF3C7;
  color: #F59E0B;
}

.badge-error {
  background: #FEE2E2;
  color: #EF4444;
}

.badge-info {
  background: #DBEAFE;
  color: #3B82F6;
}

.badge-neutral {
  background: #F3F4F6;
  color: #6B7280;
}

.badge-risk-watch {
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
}
```

### Status Indicators
```css
.status-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
}

.status-indicator.success {
  background: #D1FAE5;
}

.status-indicator.warning {
  background: #FEF3C7;
}

.status-indicator.error {
  background: #FEE2E2;
}

.status-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.status-icon.success {
  background: #10B981;
  color: #FFFFFF;
}

.status-icon.warning {
  background: #F59E0B;
  color: #FFFFFF;
}

.status-icon.error {
  background: #EF4444;
  color: #FFFFFF;
}

.status-text {
  flex: 1;
}

.status-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
}

.status-description {
  font-size: 0.8125rem;
  color: #6B7280;
}
```

### Data Tables
```css
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  border-bottom: 1px solid #E5E7EB;
}

.data-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 16px;
  font-size: 0.875rem;
  color: #1F2937;
  border-bottom: 1px solid #F3F4F6;
}

.data-table tbody tr {
  transition: background 0.2s ease;
}

.data-table tbody tr:hover {
  background: #F9FAFB;
}

.table-cell-primary {
  font-weight: 600;
  color: #1F2937;
}

.table-cell-secondary {
  color: #6B7280;
}

.table-cell-badge {
  font-weight: 600;
}

.table-cell-badge.success {
  color: #10B981;
}

.table-cell-badge.warning {
  color: #F59E0B;
}

.table-cell-badge.info {
  color: #3B82F6;
}
```

### Charts
```css
.chart-container {
  padding: 20px 0;
}

.chart-bar {
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
}

.chart-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Chart colors */
.chart-bar-fill.sent {
  background: #94A3B8;
}

.chart-bar-fill.opened {
  background: #3B82F6;
}

.chart-bar-fill.replied {
  background: #8B5CF6;
}

.chart-bar-fill.booked {
  background: #10B981;
}
```

### Alerts & Notifications
```css
.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.alert.warning {
  background: #FEF3C7;
  border-left: 4px solid #F59E0B;
}

.alert.error {
  background: #FEE2E2;
  border-left: 4px solid #EF4444;
}

.alert.success {
  background: #D1FAE5;
  border-left: 4px solid #10B981;
}

.alert.info {
  background: #DBEAFE;
  border-left: 4px solid #3B82F6;
}

.alert-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
}

.alert-message {
  font-size: 0.8125rem;
  color: #6B7280;
}
```

### Search Bar
```css
.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 10px 16px;
  transition: all 0.2s ease;
}

.search-bar:focus-within {
  border-color: #6366F1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-icon {
  color: #9CA3AF;
  font-size: 1.125rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.9375rem;
  color: #1F2937;
}

.search-input::placeholder {
  color: #9CA3AF;
}
```

### Forms & Inputs
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 0.9375rem;
  color: #1F2937;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #6366F1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input::placeholder {
  color: #9CA3AF;
}

.input:hover {
  border-color: #D1D5DB;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-helper {
  font-size: 0.8125rem;
  color: #6B7280;
  margin-top: 6px;
}

.form-error {
  font-size: 0.8125rem;
  color: #EF4444;
  margin-top: 6px;
}
```

### Empty States
```css
.empty-state {
  text-align: center;
  padding: 48px 24px;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 2rem;
  color: #9CA3AF;
}

.empty-state-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 0.9375rem;
  color: #6B7280;
}
```

### Floating Action Button
```css
.fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #EF4444;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(239, 68, 68, 0.5);
}
```

## Layout Conventions

- **Container max-width**: 1600px
- **Sidebar width**: 240px
- **Content padding**: 32px
- **Card spacing in grid**: 20px gap
- **Section spacing**: 32px between sections
- **Stat cards grid**: 2-4 columns depending on screen size

## Design Principles

1. **Soft pastel gradients** - Use subtle blue-to-pink or multi-color gradients for backgrounds
2. **Clean white cards** - Cards are crisp white with soft shadows
3. **Rounded everything** - Generous border-radius on all elements (10-20px)
4. **Pastel icon backgrounds** - Icons sit in soft colored circles/squares
5. **Subtle shadows** - Use minimal shadows for depth (0 1px 3px rgba(0,0,0,0.06))
6. **Light & airy** - Lots of white space, not dense
7. **Friendly colors** - Soft blues, pinks, greens, purples for a welcoming feel
8. **Primary color**: Indigo/Purple (#6366F1) for CTAs and important actions
9. **Status colors**: Green for success, orange for warning, red for error
10. **Hover effects** - Gentle lift animations on cards and buttons
11. **Professional yet approachable** - Balance business functionality with friendly design

## Color Semantics

- **Blue (#3B82F6)**: Information, links, general actions
- **Indigo (#6366F1)**: Primary actions, CTAs, active states
- **Green (#10B981)**: Success, positive metrics, completed states
- **Orange (#F59E0B)**: Warnings, medium priority, pause actions
- **Red (#EF4444)**: Errors, critical states, delete actions
- **Purple (#A855F7)**: Special features, premium items
- **Yellow (#FCD34D)**: Alerts, attention needed
- **Gray**: Neutral states, disabled items

## Icon Style

Use simple line icons or outlined icons (like Lucide, Heroicons, or Feather icons) to match the clean, modern aesthetic. Icons should be:
- Simple and recognizable
- Consistent stroke width
- Placed in soft colored backgrounds
- Sized appropriately (16px-24px typically)
