# Main models

export interface Site {
id: number;
name: string;
customer: Customer;
desired_date: string;
execution_date: string;
duration_in_days: number;
transport: string;
creation_date: string;
status: SiteStatus;
workers: Worker[];
}

export interface Customer {
id: number;
name: string;
is_private: boolean;
}

export interface Worker {
id: number;
first_name: string;
last_name: string;
}

export enum SiteStatus {
OPEN = 'OPEN',
ODNE = 'DONE',
}


# Overview Planning models: 

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


# DTOs for planning a site on a certain day

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

# Detail planning (linking workers to sites)

export interface SiteDetail {
id: number,
name: string,
customer: CustomerDetail,
duration_in_days: number,
desired_date: string,
planned_date: string,
status: string,
transport: string,
workers: WorkerDetail[]

}

export interface IdleWorkers {
date: string,
idle_workers: WorkerDetail[]
}

export interface WorkerDetail {
id: number,
first_name: string,
last_name: string
}

export interface CustomerDetail {
customer_name: string,
is_private_customer: boolean
}

# Workers

export interface Worker {
id: number,
first_name: string,
last_name: string
}


# Site

export interface CreateSiteRequest {
name: string;
customer_name: string;
is_private_customer: boolean | null;
desired_date: string | null;
duration_in_days: number | null;
transport: string | null;
}


# Update Site 

export interface UpdateSiteRequest {
name: string;
customer_name: string;
is_private_customer: boolean | null;
desired_date: string | null;
duration_in_days: number | null;
transport: string | null;
}

export interface SiteResponse {
id: number;
name: string;
customer: CustomerResponse | null;
desired_date: string | null;
planned_date: string | null;
duration_in_days: number | null;
status: string;
transport: string |  null;
}

export interface CustomerResponse {
id: number;
customer_name: string;
is_private_customer: boolean
}
