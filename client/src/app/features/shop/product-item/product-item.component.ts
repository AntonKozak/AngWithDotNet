import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ShopService } from '../../../core/services/shop.service';
import { IsAdminDirective } from '../../../shared/directives/is-admin.directive';
import { Product } from '../../../shared/models/products';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    CurrencyPipe,
    MatCardActions,
    MatButton,
    MatIcon,
    RouterLink,
    IsAdminDirective,
    NgIf,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product;
  cartService = inject(CartService);
  shopService = inject(ShopService);

  deleteProduct(id: number) {
    this.shopService.deleteProduct(id).subscribe({
      next: () => {
        this.reloadPage();
      },
      error: (err: any) => {
        console.error('Error deleting product:', err);
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
