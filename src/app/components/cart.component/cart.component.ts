import {AddToCart} from '../../services/add-to-cart';
import {ProductType} from '../../product/product-type';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {CartMessage} from '../../messages/message-types';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    CurrencyPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {

  public productsRemoved: ProductType[] = [];
  public cartItems: ProductType[] = [];
  public inputCoupon: string = '';

  // Signals
  public loading = true;
  public processing = false;
  public messages: CartMessage[] = [];

  constructor(private  cartService: AddToCart, private productService: ProductService) {

  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();

    this.toTop();
  }

  public setTotalAmount(cartItem: ProductType): number {
    return this.productService.getProductTotalAmount(cartItem);
  }

  public setCartSubTotalAmount(): number {
    return this.cartService.getCartSubTotalAmount();
  }

  public removeFromCart(cartItem: ProductType): void {

    this.loading = false;
    this.processing = true;

    setTimeout(() => {

      this.loading = true;
      this.processing = false;

      this.productsRemoved.push(cartItem);
      this.cartService.removeFromCart(cartItem);
      this.cartItems = this.cartService.getCart();

      let message: CartMessage = {
        id: cartItem.id,
        message: `"${cartItem.name}" has been removed.`
      }
      this.messages.push(message);
    }, 700);

  }

  public undo(id: number): void {

    let removedItem: ProductType | undefined = this.productsRemoved.find((item) => item.id === id);
    if (removedItem) {
      this.cartService.addToCart(removedItem);
      this.cartItems = this.cartService.getCart();

      this.removeMessage(id);
    }
  }

  public removeMessage(id: number): void {
    this.messages = this.messages.filter(item => item.id !== id);
  }

  public commerceFormSubmit(e: SubmitEvent): void {
    e.preventDefault();

    this.loading = false;
    this.processing = true;

    setTimeout(() => {
      this.loading = true;
      this.processing = false;
    }, 700);
  }

  public toTop(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest"
    });
  }
}
