export interface Medicine{
   id: string;
  medicine_name: string;
  category_id: string;
  seller_id: string;
  price: number;
  stock: number;
  description: string;
  expiry_date: Date;
  created_at: Date;
  updated_at: Date;
}