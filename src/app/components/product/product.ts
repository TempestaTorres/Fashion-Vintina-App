import {Component, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductService} from '../../services/product-service';
import {ProductType} from '../../product/product-type';
import {CurrencyPipe, TitleCasePipe} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ReviewType} from '../../reviews/review-type';
import {AddToCart} from '../../services/add-to-cart';

declare var $: any;

@Component({
  selector: 'app-product',
  imports: [
    RouterLink,
    TitleCasePipe,
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',

})
export class Product {

  public product: ProductType | undefined = undefined;

  // Signals
  public addedToCart: WritableSignal<boolean> = signal(false);
  public tabDescriptionActive: WritableSignal<boolean> = signal(true);
  public tabReviewsActive: WritableSignal<boolean> = signal(false);

  //Add to cart buttons signals
  public addedToCartButtons: WritableSignal<boolean>[] = [];

  // Form signals
  public formSignals: WritableSignal<boolean>[] = [];
  public selected: WritableSignal<boolean> = signal(false);

  // Form group
  public reviewFormGroup: FormGroup = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cookies: new FormControl('yes'),
  });

  public reviews: ReviewType[] = [];
  public relatedProducts: ProductType[] = [];

  protected zoomed: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService,
              private  cartService: AddToCart) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      if (params['type']) {

        this.product = this.productService.getProductByType(params['type']);

        if (this.product) {

          this.product.quantity = 1;

          let categories: ProductType[] = this.productService.getProductsByCategory(this.product.category.name);

          this.relatedProducts = categories.filter(category => category.name !== this.product?.name);

          if (this.addedToCartButtons.length === 0) {

            for (let i = 0; i < this.relatedProducts.length; i++) {
              this.addedToCartButtons.push(signal(false));
            }
          }
          else {

            for (let i = 0; i < this.addedToCartButtons.length; i++) {
              this.addedToCartButtons[i].set(false);
            }
          }

        this.addedToCart.set(false);
        this.tabDescriptionActive.set(true);
        this.tabReviewsActive.set(false);
        this.selected.set(false);

          if (this.formSignals.length === 0) {
            for (let i:number = 0; i < 5; i++) {
              this.formSignals.push(signal(false));
            }
          }
          else {
            for (let i:number = 0; i < this.formSignals.length; i++) {
              this.formSignals[i].set(false);
            }
          }
        }

        if (this.reviews.length > 0) {
          for (let i:number = 0; i < this.reviews.length; i++) {
            this.reviews.pop();
          }
        }

        if (this.zoomed) {
          this.zoomImg();
        }

        this.toTop();
      }
    });
  }
  ngAfterViewInit() {

    this.zoomImg();

  }

  protected zoomImg(): void {
    let image: string | undefined = this.product?.image;

    if (image) {
      $('.commerce-product-gallery__image').zoom({
        url: image
      });

      this.zoomed = true;
    }
  }

  goToNextProduct(type: string): void {

    this.router.navigate(['/product', type], { relativeTo: null });

  }

  public toTop(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest"
    });
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();

    // Add product to cart
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.addedToCart.set(true);
    }

  }

  public onAddToCart(product: ProductType, index: number): void {

    this.addedToCartButtons[index].set(true);

    if (product) {
      product.quantity = 1;
      this.cartService.addToCart(product);
    }

  }

  public viewCartClick(): void {
    this.router.navigate(['/cart']);
  }

  onReviewSubmit(e: SubmitEvent): void {
    e.preventDefault();

    if (this.reviewFormGroup.valid) {

      this.reviews.push({
        comment: this.reviewFormGroup.value.comment,
        rating: this.reviewFormGroup.value.rating,
        confirmed: false
      });

      this.reviewFormGroup.reset();

    }

  }

  public tabToggle(index: number) {
    this.tabDescriptionActive.update(value => !value);
    this.tabReviewsActive.update(value => !value);
  }

  public starToggle(index: number) {
    this.selected.set(true);

    for (let i:number = 0; i < this.formSignals.length; i++) {
      this.formSignals[i].set(false);
    }
    this.formSignals[index].set(true);

    let s = this.reviewFormGroup.get('rating');

    if (s !== null) {
      s.setValue(index + 1);
    }
  }
}
