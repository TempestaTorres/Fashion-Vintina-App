import { Component } from '@angular/core';
import {AddToCart} from '../../services/add-to-cart';
import {ProductType} from '../../product/product-type';
import {ScrollTotopService} from '../../services/scrolltotop-service';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/validators';
import {Phones, PhoneType} from '../../phones/phones-types';

@Component({
  selector: 'app-checkout',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  public cartItems: ProductType[] = [];
  public labelActive: boolean = false;
  public labelFirstNameActive: boolean = false;
  public labelLastNameActive: boolean = false;
  public labelCompanyActive: boolean = false;
  public labelShippingAddressActive: boolean = false;
  public labelApartmentActive: boolean = false;
  public labelCityActive: boolean = false;
  public labelZipcodeActive: boolean = false;
  public labelPostalcodeActive: boolean = false;
  public labelPhoneActive: boolean = false;
  public shipToAddressChecked: boolean = true;
  public shipToPickupPointChecked: boolean = false;
  public currentCountry: string = 'US';

  public phones: PhoneType[] = Phones;
  public currentPhoneFlag: string = this.phones[0].flag;

  public formCheckoutGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    checkBox: new FormControl(true),
    delivery_strategies: new FormControl('delivery-to-address'),
    country_select: new FormControl('US'),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    company: new FormControl(''),
    shipping_address: new FormControl('', [Validators.required, Validators.minLength(6)]),
    apartment: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state_select: new FormControl(''),
    zip_code: new FormControl('', [Validators.required]),
    postal_code: new FormControl(''),
    phone: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
    phone_country_select: new FormControl(''),
  });

  constructor(private  cartService: AddToCart, private scrollTotopService: ScrollTotopService) {
  }

  ngOnInit() {
    this.scrollTotopService.toTop();
    this.cartItems = this.cartService.getCart();

    console.log(this.cartItems);
  }

  get email() { return this.formCheckoutGroup.get('email'); }
  get firstName() { return this.formCheckoutGroup.get('first_name'); }
  get lastName() { return this.formCheckoutGroup.get('last_name'); }
  get shippingAddress() { return this.formCheckoutGroup.get('shipping_address'); }
  get city() { return this.formCheckoutGroup.get('city'); }
  get zipcode() { return this.formCheckoutGroup.get('zip_code'); }
  get phone() { return this.formCheckoutGroup.get('phone'); }

  public onInputChange(): void {
    this.labelActive = this.formCheckoutGroup.value.email.length > 0;
  }
  public onInputCountryChange(): void {
    this.currentCountry = this.formCheckoutGroup.value.country_select;
  }
  public onInputFirstNameChange(): void {
    this.labelFirstNameActive = this.formCheckoutGroup.value.first_name.length > 0;
  }
  public onInputLastNameChange(): void {
    this.labelLastNameActive = this.formCheckoutGroup.value.last_name.length > 0;
  }
  public onInputCompanyChange(): void {
    this.labelCompanyActive = this.formCheckoutGroup.value.company.length > 0;
  }
  public onInputShippingAddressChange(): void {
    this.labelShippingAddressActive = this.formCheckoutGroup.value.shipping_address.length > 0;
  }
  public onInputShippingApartmentChange(): void {
    this.labelApartmentActive = this.formCheckoutGroup.value.apartment.length > 0;
  }
  public onInputShippingCityChange(): void {
    this.labelCityActive = this.formCheckoutGroup.value.city.length > 0;
  }
  public onInputZipcodeChange(): void {
    this.labelZipcodeActive = this.formCheckoutGroup.value.zip_code.length > 0;
  }
  public onInputPostalodeChange(): void {
    this.labelPostalcodeActive = this.formCheckoutGroup.value.postal_code.length > 0;
  }
  public onInputPhoneChange(): void {
    this.labelPhoneActive = this.formCheckoutGroup.value.phone.length > 0;
  }
  public onInputPhoneCountryChange(): void {

    let code: string | null = this.getPhoneCode(this.formCheckoutGroup.value.phone_country_select);
    let flag: string | null = this.getPhoneFlag(this.formCheckoutGroup.value.phone_country_select);

    if (code !== null) {
      let value: string = code + " ";

      this.formCheckoutGroup.patchValue({
        phone: value
      });
    }

    if (flag !== null) {
      this.currentPhoneFlag = flag;
    }
  }

  public shipToAddressClick(): void {
    this.shipToAddressChecked = true;
    this.shipToPickupPointChecked = false;
  }
  public shipToPickUpPointClick(): void {
    this.shipToAddressChecked = false;
    this.shipToPickupPointChecked = true;
  }
  private getPhoneCode(id: string): string | null {

    for (let i = 0; i < this.phones.length; i++) {
      if (id === this.phones[i].id) {
        return this.phones[i].code;
      }
    }
    return null;
  }
  private getPhoneFlag(id: string): string | null {

    for (let i = 0; i < this.phones.length; i++) {
      if (id === this.phones[i].id) {
        return this.phones[i].flag;
      }
    }
    return null;
  }
}
