export interface CreateSiteRequest {
  name: string;
  customer_name: string;
  is_private_customer: boolean | null;
  desired_date: string | null;
  duration_in_days: number | null;
  transport: string | null;
}
