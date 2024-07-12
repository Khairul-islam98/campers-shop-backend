import { Types } from 'mongoose';

export interface IOrder {
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  productId: Types.ObjectId;
  totalPrice: number;
}
