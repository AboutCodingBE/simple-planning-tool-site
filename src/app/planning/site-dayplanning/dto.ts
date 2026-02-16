export interface DayOverview {
  date: string,
  plannedSites: PlannedSites[]
}

export interface PlannedSites {
  site_id: number,
  site_name: string,
  execution_date: string,
  duration_in_days: number,
  end_date: string,
  days_remaining: number,
  site_status: string,
  workers: Worker[]
}

export interface Worker {
  worker_id: number,
  worker_firstname: string,
  worker_lastname: string
}
