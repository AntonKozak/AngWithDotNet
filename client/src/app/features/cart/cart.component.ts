import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, OrderSummaryComponent, EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  onAction() {
    this.router.navigate(['/shop']);
  }
}
