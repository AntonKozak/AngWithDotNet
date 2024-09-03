import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { StepperComponent } from './stepper/stepper.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    MatButtonModule,
    RouterLink,
    MatButton,
    StepperComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {}
