export interface Payment 
{
  payment_id: string;

  customer_id: string;
  product_id: string;

  amount: string;
  currency: string;
  method: string;
  status: string;
  external_ref: string;

  paid_at: string | null;
}