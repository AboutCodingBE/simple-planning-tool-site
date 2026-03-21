export interface Site {
  id: number;
  name: string;
  customerName: string;
  isPrivateCustomer: boolean;
  desiredDate: string | null;
  durationInDays: number | null;
  transport: string | null;
  status: 'OPEN' | 'DONE';
}
