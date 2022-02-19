import { stringify } from 'querystring';
import categories from '../data/categories.json';
import { CART_KEY } from '../lib/constant';
import { CartItem } from '../models/CartItem';

export class CartService {
  public static add(
    categoryId: string | number,
    subCategoryId: string,
    id: string,
    image: string,
    price: number,
    name: string,
    creator?: string,
  ) {
    const type = this.getType(categoryId);
    const cart: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');

    const existIdx = cart.findIndex(
      (c) =>
        c.categoryId == categoryId &&
        c.subCategoryId == subCategoryId &&
        c.id == id,
    );

    if (existIdx !== -1) {
      cart[existIdx] = {
        ...cart[existIdx],
        quantity: cart[existIdx].quantity + 1,
      };
    } else {
      const obj = {
        id,
        subCategoryId,
        categoryId,
        type,
        quantity: 1,
        image,
        price,
        name,
      };

      if (creator) {
        obj['creator'] = creator;
      }

      cart.push(obj);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  public static addQty(id: string): CartItem[] {
    const cart: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    const existIdx = cart.findIndex((c) => c.id == id);

    if (existIdx !== -1) {
      cart[existIdx] = {
        ...cart[existIdx],
        quantity: cart[existIdx].quantity + 1,
      };

      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    return cart;
  }

  public static reduceQty(id: string): CartItem[] {
    let cart: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    const existIdx = cart.findIndex((c) => c.id == id);

    if (existIdx !== -1) {
      if (cart[existIdx].quantity > 1) {
        cart[existIdx] = {
          ...cart[existIdx],
          quantity: cart[existIdx].quantity - 1,
        };
      } else {
        cart = cart.filter((c) => c.id !== id);
      }

      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    return cart;
  }

  public static getAll(): CartItem[] {
    const cart: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    return cart;
  }

  public static clear() {
    localStorage.setItem(CART_KEY, '[]');
  }

  public static containService(): boolean {
    const carts = CartService.getAll();
    return carts.some(
      (c) => c.type === 'architecture' || c.type === 'interior',
    );
  }

  public static containGoods(): boolean {
    const carts = CartService.getAll();
    return carts.some(
      (c) => c.type !== 'architecture' && c.type !== 'interior',
    );
  }

  public static getTotal(): number {
    const cart: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    const total = cart.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);
    return total;
  }

  public static delete(id: string) {
    const cart: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    const newCart = cart.filter((c) => c.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  }

  private static getType(
    categoryId: string | number,
  ):
    | 'architecture'
    | 'interior'
    | 'furniture'
    | 'material'
    | 'other'
    | 'accesories' {
    if (typeof categoryId === 'number') categoryId.toString();
    const category = categories.categories.find((c) => c.id == categoryId);

    switch (category.id) {
      case 1:
        return 'accesories';
      case 2:
        return 'architecture';
      case 3:
        return 'other';
      case 4:
        return 'interior';
      case 5:
        return 'material';
      case 6:
        return 'furniture';
    }
  }
}
