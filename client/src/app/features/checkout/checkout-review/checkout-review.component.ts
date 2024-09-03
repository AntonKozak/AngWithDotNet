import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';
import { AccountService } from '../../../core/services/account.service';
import { CartService } from '../../../core/services/cart.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { StripeService } from '../../../core/services/stripe.service';
import { AddressPipe } from '../../../shared/pipes/address.pipe';
import { PaymentPipe } from "../../../shared/pipes/payment.pipe";

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [CurrencyPipe, AddressPipe, PaymentPipe],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  private stripeService = inject(StripeService);
  private snackbar = inject(SnackbarService);
  private aaccountService = inject(AccountService);
  cartService = inject(CartService);
  @Input() confirmationToken?: ConfirmationToken;
}
