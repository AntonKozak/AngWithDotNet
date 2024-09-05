import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../shared/models/order';
import { AddressPipe } from '../../../shared/pipes/address.pipe';
import { PaymentPipe } from '../../../shared/pipes/payment.pipe';

@Component({
  selector: 'app-order-detailed',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    DatePipe,
    CurrencyPipe,
    AddressPipe,
    RouterLink,
    PaymentPipe,
  ],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss',
})
export class OrderDetailedComponent implements OnInit {
  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);

  order?: Order;

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const orderId = this.activatedRoute.snapshot.params['id'];

    if (!orderId) return;

    this.orderService.getOrderDetailed(orderId).subscribe((order) => {
      next: {
        this.order = order;
        console.log('Order loaded', this.order.shipToAddress);
      }
    });
  }
}
