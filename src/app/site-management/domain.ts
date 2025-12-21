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
