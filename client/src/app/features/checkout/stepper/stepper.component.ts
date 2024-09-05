import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import {
  ConfirmationToken,
  StripeAddressElement,
  StripeAddressElementChangeEvent,
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { AccountService } from '../../../core/services/account.service';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { StripeService } from '../../../core/services/stripe.service';
import { OrderToCreate, ShipToAddress } from '../../../shared/models/order';
import { Address } from '../../../shared/models/user';
import { CheckoutDeliveryComponent } from '../checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from '../checkout-review/checkout-review.component';
@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButton,
    MatCheckboxModule,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CurrencyPipe,
    JsonPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements OnInit, OnDestroy {
  private stripeService = inject(StripeService);
  private snackbar = inject(SnackbarService);
  private aaccountService = inject(AccountService);
  private router = inject(Router);
  private orderService = inject(OrderService);
  cartService = inject(CartService);
  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;
  saveAddress = false;
  completionStatus = signal<{
    address: boolean;
    card: boolean;
    delivery: boolean;
  }>({ address: false, card: false, delivery: false });
  confirmationToken?: ConfirmationToken;
  loading = false;

  async ngOnInit() {
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount('#address-element');
      this.addressElement.on('change', this.handleAddressChange);

      this.paymentElement = await this.stripeService.createPaymentElement();
      this.paymentElement.mount('#payment-element');
      this.paymentElement.on('change', this.handlePaymentChange);
    } catch (error: any) {
      this.snackbar.error(error.message);
    }
  }

  handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    this.completionStatus.update((state) => {
      state.address = event.complete;
      return state;
    });
  };

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completionStatus.update((state) => {
      state.card = event.complete;
      return state;
    });
  };

  handleDeliveryChange(event: boolean) {
    this.completionStatus.update((state) => {
      state.delivery = event;
      return state;
    });
  }

  async getConfirmationToken() {
    try {
      if (
        Object.values(this.completionStatus()).every(
          (status) => status === true,
        )
      ) {
        const result = await this.stripeService.createConfirmationToken();
        if (result.error) throw new Error(result.error.message);
        this.confirmationToken = result.confirmationToken;
      }
    } catch (error: any) {
      this.snackbar.error(error.message);
    }
  }

  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFromStripeAddress();
        address && firstValueFrom(this.aaccountService.updateAddress(address));
      }
    }
    if (event.selectedIndex === 2) {
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
    }
    if (event.selectedIndex === 3) {
      await this.getConfirmationToken();
    }
  }

  async confirmPayment(stepper: MatStepper) {
    this.loading = true;
    try {
      if (this.confirmationToken) {
        const result = await this.stripeService.confirmPayment(
          this.confirmationToken,
        );

        if (result.paymentIntent?.status === 'succeeded') {
          const order = await this.createOrderModel();
          const orderResult = await firstValueFrom(
            this.orderService.createOrder(order),
          );

          if (orderResult) {
            this.orderService.orderComplete = true;
            this.snackbar.success('Payment successful');
            this.cartService.deleteCart();
            this.cartService.selectedDelivery.set(null);
            this.router.navigateByUrl('/checkout/success');
          } else {
            throw new Error('Order creation failed');
          }
        } else if (result.error) {
          // if customer paid but order creation failed. Error from Stripe
          throw new Error(result.error.message);
        } else {
          throw new Error('Payment failed or cancelled ');
        }
      }
    } catch (error: any) {
      this.snackbar.error(error.message || 'An error occurred');
      stepper.previous();
    } finally {
      this.loading = false;
    }
  }

  private async createOrderModel(): Promise<OrderToCreate> {
    const cart = this.cartService.cart();
    const shippingAddress =
      (await this.getAddressFromStripeAddress()) as ShipToAddress;
    const card = this.confirmationToken?.payment_method_preview.card;
    if (!cart?.id || !shippingAddress || !card || !cart.deliveryMethodId) {
      throw new Error('Invalid order data');
    }

    const order: OrderToCreate = {
      cartId: cart.id,
      paymentSummary: {
        last4: +card.last4,
        brand: card.brand,
        expMonth: card.exp_month,
        expYear: card.exp_year,
      },
      deliveryMethodId: cart.deliveryMethodId,
      shippingAddress: shippingAddress,
    };

    return order;
  }

  private async getAddressFromStripeAddress(): Promise<
    Address | ShipToAddress | null
  > {
    const result = await this.addressElement?.getValue();
    const address = result?.value.address;

    if (address) {
      return {
        name: result.value.name,
        line1: address.line1,
        line2: address.line2 || undefined,
        state: address.state,
        city: address.city,
        country: address.country,
        postalCode: address.postal_code,
      };
    } else {
      throw new Error('Address is not valid');
    }
  }

  onSaveAddressCheckboxChange(event: MatCheckboxChange) {
    this.saveAddress = event.checked;
  }

  ngOnDestroy(): void {
    if (this.addressElement) {
      this.addressElement.destroy();
    }
  }
}
