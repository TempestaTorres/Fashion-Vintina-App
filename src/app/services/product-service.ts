import { Injectable } from '@angular/core';
import {Products, ProductType} from '../product/product-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public getProductByType(productType: string): ProductType | undefined {

    return Products.find((product) => product.type === productType);
  }

  public getProductsByCategory(category: string): ProductType[] {
    return Products.filter((product) => product.category.name === category);
  }

  public getProductTotalAmount(product: ProductType): number {

    let quantity: number | undefined = product.quantity;
    let total: number = product.price;
    if (quantity) {
      total *= quantity;
    }
    return total;
  }
}
