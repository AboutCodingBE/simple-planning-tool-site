export interface WorkerDayOverview {
  date: string;
  day_overview: WorkerDayDetail[];
}

export interface WorkerDayDetail {
  id: number;
  firstname: string;
  lastname: string;
  current_site?: CurrentSite;
}

export interface CurrentSite {
  name: string;
  until: string;
}
