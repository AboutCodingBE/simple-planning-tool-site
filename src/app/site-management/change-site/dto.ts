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
