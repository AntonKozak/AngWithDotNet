import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ShopService } from '../../../core/services/shop.service';
import { Product } from '../../../shared/models/products';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider,
    FormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopSrvice = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  product?: Product;
  quantityInCart = 0;
  quantity = 1;

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;

    this.shopSrvice.getProduct(+id).subscribe({
      next: (product) => {
        this.product = product;
        this.updateQuantityInCart();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateQuantityInCart() {
    this.quantityInCart =
      this.cartService
        .cart()
        ?.items.find((x) => x.productId === this.product?.id)?.quantity || 0;

    this.quantity = this.quantityInCart || 1;
  }

  updateCart() {
    if (!this.product) return;

    if (this.quantity > this.quantityInCart) {
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemsToCart(this.product, itemsToAdd);
    } else {
      const itemToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemToRemove);
    }
  }

  getButtonText() {
    return this.quantityInCart > 0 ? 'Update cart' : 'Add to cart';
  }
}
