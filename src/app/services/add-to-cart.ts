import {Injectable} from '@angular/core';
import {ProductType} from '../product/product-type';

@Injectable({
  providedIn: 'root',
})
export class AddToCart {
  private _cart: ProductType[] = [];

  public addToCart(product: ProductType): void {
    let found: boolean = false;

    for (const item of this._cart) {
      if (item.id === product.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      this._cart.push(product);
    }
  }

  public getCart(): ProductType[] {
    return this._cart;
  }
  public getCartSubTotalAmount(): number {
    let total: number = 0;

    for (const cart of this._cart) {
      let quantity: number | undefined = cart.quantity;

      if (quantity !== undefined) {
        total += quantity * cart.price;
      }
      else {
        total += cart.price;
      }
    }
    return total;
  }

  public removeFromCart(cartItem: ProductType): void {
    this._cart = this._cart.filter(item => item.id !== cartItem.id);
  }
}
