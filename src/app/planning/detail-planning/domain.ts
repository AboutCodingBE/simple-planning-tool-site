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
