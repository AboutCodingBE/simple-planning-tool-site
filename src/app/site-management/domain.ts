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

export interface CreateSiteRequest {
  name: string;
  customer_name: string;
  is_private_customer: boolean | null;
  desired_date: string | null;
  duration_in_days: number | null;
  transport: string | null;
}
