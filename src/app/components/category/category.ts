import {Component, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductType} from '../../product/product-type';
import {ProductService} from '../../services/product-service';
import {CurrencyPipe, TitleCasePipe} from '@angular/common';
import {AddToCart} from '../../services/add-to-cart';

@Component({
  selector: 'app-category',
  imports: [
    RouterLink,
    TitleCasePipe,
    CurrencyPipe
  ],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {

  public products: ProductType[] = [];
  public categoryName: string = '';

  //Add to cart buttons signals
  public addedToCartButtons: WritableSignal<boolean>[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService,
              private  cartService: AddToCart) {
  }

  ngOnInit() {

    this.toTop();
    this.route.params.subscribe(params => {

      if (params['name']) {

        this.categoryName = params['name'];
        this.products = this.productService.getProductsByCategory(params['name']);

        if (this.products.length > 0) {
          for (let i = 0; i < this.products.length; i++) {
            this.addedToCartButtons.push(signal(false));
          }
        }

      }

    });
  }

  public onAddToCart(product: ProductType, index: number): void {

    this.addedToCartButtons[index].set(true);

    if (product) {
      product.quantity = 1;
      this.cartService.addToCart(product);
    }

  }
  public toTop(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest"
    });
  }
}
