export interface Planning {
  from: string;              // LocalDate → string (ISO: "2025-12-17")
  until: string;             // LocalDate → string
  weeks: Week[];
}

export interface Week {
  week: number;              // Integer → number
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}

export interface Day {
  date: string;              // LocalDate → string
  sites: SiteView[];
}

export interface SiteView {
  id: number;                // Long → number
  name: string;
  duration_in_days: number;  // Note: snake_case to match @JsonProperty
  status: string;
}

export interface UnplannedSite {
  id: number,
  name: string,
  customer_name: string,
  duration_in_days: number,
  desired_date: string,
  planned_date: string
}
