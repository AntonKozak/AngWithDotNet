import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { AdminService } from '../../../core/services/admin.service';
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
  private accountService = inject(AccountService);
  private router = inject(Router);
  private adminService = inject(AdminService);

  order?: Order;
  buttonText = this.accountService.isAdmin() ? 'Refund Order' : 'Cancel Order';

  ngOnInit(): void {
    this.loadOrder();
  }

  onReturnClick() {
    this.accountService.isAdmin()
      ? this.router.navigateByUrl('/admin')
      : this.router.navigateByUrl('/orders');
  }

  loadOrder() {
    const orderId = this.activatedRoute.snapshot.params['id'];

    if (!orderId) return;

    const loadOrderData = this.accountService.isAdmin()
      ? this.adminService.getOrder(orderId)
      : this.orderService.getOrderDetailed(orderId);

    loadOrderData.subscribe((order) => {
      next: {
        this.order = order;
        console.log('Order loaded', this.order.shipToAddress);
      }
    });
  }
}
