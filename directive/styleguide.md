# App Style Guide - Gradient theme

## Color Palette

### Base Colors
- **Background Primary**: #1A2642 (deep navy blue)
- **Background Gradient Start**: #1E3A5F (medium blue)
- **Background Gradient End**: #2D4A7C (lighter blue)
- **Sidebar Background**: #0F1828 (very dark navy)
- **Card Background**: rgba(30, 58, 95, 0.4) with backdrop blur (semi-transparent blue)

### Accent Colors
- **Cyan/Turquoise**: #36D9D4 (primary brand color - used for icons and highlights)
- **Blue**: #4A9EFF (links, interactive elements)
- **Orange/Coral**: #FF6B47 (secondary accent - used for document icons)
- **Green**: #4ADE80 (success, buy signals, positive indicators)
- **Pink/Magenta**: #E056FD (tertiary accent - used for analytics icons)
- **Purple**: #8B5CF6 (badges, tags)
- **Yellow/Gold**: #FDB022 (warnings, medium priority badges)
- **Red**: #EF4444 (sell signals, critical states)

### Text Colors
- **Text Primary**: #FFFFFF (white for headings and important text)
- **Text Secondary**: #A8B8D8 (light blue-gray for descriptions)
- **Text Muted**: #6B7A99 (subdued text for labels and timestamps)
- **Text Success**: #4ADE80 (green text for positive values)
- **Text Error**: #EF4444 (red text for negative values)

### Border & Dividers
- **Border Light**: rgba(255, 255, 255, 0.1) (subtle borders)
- **Border Medium**: rgba(255, 255, 255, 0.15) (card borders)
- **Border Accent**: rgba(54, 217, 212, 0.3) (highlighted borders)

## Typography

- **Font Family**: 'Inter', 'Segoe UI', -apple-system, sans-serif
- **Base Size**: 16px

### Headings
- **h1**: 2.5rem (40px), font-weight: 700, color: #FFFFFF
- **h2**: 1.875rem (30px), font-weight: 600, color: #FFFFFF
- **h3**: 1.5rem (24px), font-weight: 600, color: #FFFFFF
- **h4**: 1.125rem (18px), font-weight: 600, color: #FFFFFF

### Body Text
- **Large**: 1.125rem (18px), font-weight: 400, color: #A8B8D8
- **Regular**: 1rem (16px), font-weight: 400, color: #A8B8D8
- **Small**: 0.875rem (14px), font-weight: 400, color: #6B7A99
- **Tiny**: 0.75rem (12px), font-weight: 400, color: #6B7A99

### Numbers (Stats)
- **Large Number**: 3rem (48px), font-weight: 700, color: #FFFFFF
- **Medium Number**: 2rem (32px), font-weight: 600, color: #FFFFFF
- **Price**: 1.5rem (24px), font-weight: 600, color: #FFFFFF

## Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

## Component Patterns

### Page Background
```css
.page-background {
  background: linear-gradient(135deg, #1E3A5F 0%, #2D4A7C 50%, #3D5A8C 100%);
  min-height: 100vh;
}
```

### Sidebar
```css
.sidebar {
  background: #0F1828;
  width: 240px;
  padding: 24px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px 32px;
}

.sidebar-logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #36D9D4 0%, #2AB8B3 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: #A8B8D8;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-nav-item:hover {
  background: rgba(54, 217, 212, 0.08);
  color: #36D9D4;
}

.sidebar-nav-item.active {
  background: rgba(54, 217, 212, 0.12);
  color: #36D9D4;
  border-left: 3px solid #36D9D4;
}
```

### Stat Cards (with Colorful Icons)
```css
.stat-card {
  background: rgba(30, 58, 95, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.stat-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.stat-card-label {
  font-size: 0.875rem;
  color: #A8B8D8;
  font-weight: 500;
}

.stat-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* Icon color variants */
.stat-card-icon.cyan {
  background: linear-gradient(135deg, #36D9D4 0%, #2AB8B3 100%);
  box-shadow: 0 8px 16px rgba(54, 217, 212, 0.3);
}

.stat-card-icon.orange {
  background: linear-gradient(135deg, #FF6B47 0%, #FF5230 100%);
  box-shadow: 0 8px 16px rgba(255, 107, 71, 0.3);
}

.stat-card-icon.green {
  background: linear-gradient(135deg, #4ADE80 0%, #22C55E 100%);
  box-shadow: 0 8px 16px rgba(74, 222, 128, 0.3);
}

.stat-card-icon.pink {
  background: linear-gradient(135deg, #E056FD 0%, #C833E8 100%);
  box-shadow: 0 8px 16px rgba(224, 86, 253, 0.3);
}

.stat-card-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-card-trend {
  font-size: 0.875rem;
  color: #4ADE80;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-card-trend.negative {
  color: #EF4444;
}
```

### Feature Cards (Large Icon Cards)
```css
.feature-card {
  background: rgba(30, 58, 95, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.feature-card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
}

.feature-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 8px;
}

.feature-card-description {
  font-size: 0.875rem;
  color: #A8B8D8;
  line-height: 1.5;
}
```

### List Items (Trading Recommendations)
```css
.recommendation-item {
  background: rgba(30, 58, 95, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
}

.recommendation-item:hover {
  background: rgba(30, 58, 95, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.recommendation-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.recommendation-content {
  flex: 1;
}

.recommendation-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.recommendation-symbol {
  font-size: 1rem;
  font-weight: 600;
  color: #FFFFFF;
}

.recommendation-name {
  font-size: 0.875rem;
  color: #A8B8D8;
}

.recommendation-details {
  font-size: 0.8125rem;
  color: #6B7A99;
}

.recommendation-target {
  color: #4ADE80;
  font-weight: 500;
}

.recommendation-price {
  text-align: right;
}

.recommendation-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
}

.recommendation-confidence {
  font-size: 0.75rem;
  color: #6B7A99;
}
```

### Analysis Cards (with Chart Thumbnails)
```css
.analysis-card {
  background: rgba(20, 40, 70, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  gap: 16px;
  transition: all 0.2s ease;
}

.analysis-card:hover {
  background: rgba(25, 45, 80, 0.6);
  border-color: rgba(255, 255, 255, 0.12);
}

.analysis-chart-thumbnail {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
  overflow: hidden;
}

.analysis-content {
  flex: 1;
  min-width: 0;
}

.analysis-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.analysis-symbol {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #FFFFFF;
}

.analysis-pattern {
  font-size: 0.8125rem;
  color: #A8B8D8;
}

.analysis-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  color: #6B7A99;
}

.analysis-values {
  text-align: right;
}

.analysis-entry {
  font-size: 0.875rem;
  color: #4ADE80;
  font-weight: 500;
}

.analysis-targets {
  font-size: 0.75rem;
  color: #6B7A99;
}
```

### Badges & Tags
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-buy {
  background: rgba(74, 222, 128, 0.15);
  color: #4ADE80;
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.badge-sell {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.badge-spot {
  background: rgba(139, 92, 246, 0.15);
  color: #8B5CF6;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.badge-medium {
  background: rgba(251, 191, 36, 0.15);
  color: #FDB022;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.badge-large-cap {
  background: rgba(224, 86, 253, 0.15);
  color: #E056FD;
  border: 1px solid rgba(224, 86, 253, 0.3);
}

.badge-premium {
  background: linear-gradient(135deg, #FDB022 0%, #FF6B47 100%);
  color: #FFFFFF;
  border: none;
}
```

### Buttons
```css
.btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #36D9D4 0%, #2AB8B3 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(54, 217, 212, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(54, 217, 212, 0.4);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(74, 158, 255, 0.15);
  color: #4A9EFF;
  border: 1px solid rgba(74, 158, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(74, 158, 255, 0.25);
  border-color: #4A9EFF;
}

.btn-dark {
  background: rgba(15, 24, 40, 0.8);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-dark:hover {
  background: rgba(20, 30, 50, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
}

.icon-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 24, 40, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  color: #A8B8D8;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(54, 217, 212, 0.15);
  border-color: #36D9D4;
  color: #36D9D4;
}
```

### Status Indicators
```css
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.active {
  background: #4ADE80;
  box-shadow: 0 0 8px rgba(74, 222, 128, 0.5);
}

.status-dot.inactive {
  background: #6B7A99;
}

.status-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #A8B8D8;
}
```

### Section Headers
```css
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
}

.section-icon {
  color: #36D9D4;
  font-size: 1.25rem;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #A8B8D8;
  margin-top: 4px;
}
```

### Forms & Inputs
```css
.input {
  background: rgba(15, 24, 40, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
  color: #FFFFFF;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.input::placeholder {
  color: #6B7A99;
}

.input:focus {
  outline: none;
  border-color: #36D9D4;
  background: rgba(15, 24, 40, 0.7);
  box-shadow: 0 0 0 3px rgba(54, 217, 212, 0.15);
}

.input:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #A8B8D8;
  margin-bottom: 8px;
}
```

## Visual Effects

### Glassmorphism
```css
.glass {
  background: rgba(30, 58, 95, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-dark {
  background: rgba(15, 24, 40, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Icon Glow Effects
```css
.icon-glow-cyan {
  box-shadow: 0 8px 20px rgba(54, 217, 212, 0.35);
}

.icon-glow-orange {
  box-shadow: 0 8px 20px rgba(255, 107, 71, 0.35);
}

.icon-glow-green {
  box-shadow: 0 8px 20px rgba(74, 222, 128, 0.35);
}

.icon-glow-pink {
  box-shadow: 0 8px 20px rgba(224, 86, 253, 0.35);
}
```

### Gradient Overlays
```css
.gradient-overlay-blue {
  background: linear-gradient(135deg, rgba(54, 217, 212, 0.1) 0%, rgba(74, 158, 255, 0.1) 100%);
}

.gradient-overlay-purple {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(224, 86, 253, 0.1) 100%);
}
```

## Layout Conventions

- **Container max-width**: 1600px
- **Sidebar width**: 240px
- **Content padding**: 32px
- **Card spacing in grid**: 20px gap
- **Section spacing**: 40px between major sections
- **Stat cards**: 4 columns on desktop, 2 on tablet, 1 on mobile

## Design Principles

1. **Gradient backgrounds** - Use subtle blue gradients for the main background
2. **Glassmorphism** - Cards and panels use frosted glass effect with backdrop blur
3. **Colorful icon badges** - Every stat/feature gets a vibrant gradient icon (cyan, orange, green, pink)
4. **Glowing effects** - Icons and interactive elements have subtle glows matching their color
5. **Rounded corners** - Generous border-radius (10-16px) for modern feel
6. **Transparency layers** - Multiple levels of semi-transparent backgrounds for depth
7. **Status indicators** - Clear visual signals with dots and badges
8. **Hover animations** - Smooth lift and glow effects on interactive cards
9. **Consistent iconography** - Icons paired with every section header and stat
10. **Financial data presentation** - Clear hierarchy for prices, percentages, and metrics
11. **Dark sidebar** - Very dark navy sidebar for strong contrast
12. **Accent color**: Cyan (#36D9D4) is the primary brand color

## Icon Color Assignments

Use these color assignments consistently:
- **Analytics/Charts**: Cyan (#36D9D4)
- **Documents/Reports**: Orange (#FF6B47)
- **Success/Growth**: Green (#4ADE80)
- **Targets/Goals**: Pink (#E056FD)
- **Warnings/Medium**: Yellow (#FDB022)
- **AI/Automation**: Purple (#8B5CF6)
