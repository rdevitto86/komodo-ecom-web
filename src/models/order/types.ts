import Discount from '../discount/discount.model';
import OrderItem from '../order-item/order-item.model';
import Payment from '../payment/payment.model';
import User from '../user/user.model';

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'SHIPPED'
  | 'IN-PROGRESS'
  | 'PARTIAL COMPLETE'
  | 'COMPLETED'
  | 'CANCELLED';

export type OrderHistory = {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
};

export interface OrderType {
  id: string; // orderItemId
  status: OrderStatus;
  itemsProduct?: OrderItem<'PRODUCT'>[];
  itemsService?: OrderItem<'SERVICE'>[];
  billing: Payment;
  subtotal: number;
  totalTax: number;
  totalFees: number;
  totalShipping: number;
  discounts: Discount[];
  totalDiscounts: number
  finalTotal: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  history: OrderHistory[];
}
