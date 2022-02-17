import { ADDRESS_KEY, PAYMENT_KEY, SHIPPING_KEY } from '../lib/constant';
import { Payment } from '../models/Payment';
import { Shipping } from '../models/Shipping';

export class OrderService {
  public static savePayment(payment: Payment) {
    localStorage.setItem(PAYMENT_KEY, JSON.stringify(payment));
  }

  public static getPayment(): Payment {
    return JSON.parse(localStorage.getItem(PAYMENT_KEY) ?? '{}');
  }

  public static saveShipping(shipping: Shipping) {
    localStorage.setItem(SHIPPING_KEY, JSON.stringify(shipping));
  }

  public static getShipping(): Shipping {
    return JSON.parse(localStorage.getItem(SHIPPING_KEY) ?? '{}');
  }

  public static saveAddress(address: string) {
    localStorage.setItem(ADDRESS_KEY, address);
  }

  public static getAddress(): string {
    return localStorage.getItem(ADDRESS_KEY);
  }
}
