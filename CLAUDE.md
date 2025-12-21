# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 21 application that displays planning/scheduling data in a weekly calendar format. The app fetches planning data from a backend API and displays it in a table with days of the week.

## Common Commands

### Development
- `npm start` or `ng serve` - Start development server at http://localhost:4200/
- `ng serve --open` - Start dev server and open browser automatically

### Building
- `npm run build` or `ng build` - Production build (outputs to `dist/`)
- `npm run watch` or `ng build --watch --configuration development` - Development build with watch mode

### Testing
- `npm test` or `ng test` - Run unit tests with Vitest

### Code Generation
- `ng generate component component-name` - Generate a new component
- `ng generate --help` - List all available schematics

## Architecture

### Application Structure

The application uses Angular's standalone components architecture (no NgModules). Key architectural patterns:

- **Standalone Components**: All components are standalone with explicit imports
- **Signals**: Uses Angular signals for reactive state (`signal()`)
- **Routing**: Client-side routing configured in `src/app/app.routes.ts`
- **HTTP Communication**: Injects `HttpClient` directly into components

### Core Components

- **App** (`src/app/app.ts`): Root component with router outlet
- **PlanningOverview** (`src/app/planning/planning-overview.ts`): Main planning view component that fetches and displays weekly planning data

### Domain Model

The planning domain is defined in `src/app/planning/domain.ts`:
- `Planning`: Contains date range and array of weeks
- `Week`: Contains 7 Day objects (monday-sunday) and week number
- `Day`: Contains date and array of SiteView objects
- `SiteView`: Site/project information with id, name, duration, and status

Note: Backend uses snake_case (`duration_in_days`) while frontend typically uses camelCase.

### Routing

Default route (`/`) redirects to `/planning-overview`. The PlanningOverview component is the main view.

### Backend Integration

The app expects a backend API at `http://localhost:8080/planning` that returns Planning JSON data. Ensure the backend is running before starting the frontend.

## Configuration

### Prettier
Configured in package.json with:
- 100 character line width
- Single quotes
- Angular parser for HTML files

### TypeScript
- Version: 5.9.2
- Config files: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json`

### Build Configuration
Angular configuration in `angular.json`:
- Default production build with optimizations
- Development build with source maps and no optimization
- Bundle size budgets: 500kB warning, 1MB error for initial bundle
