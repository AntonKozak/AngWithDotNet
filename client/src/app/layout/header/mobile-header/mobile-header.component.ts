import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { BusyService } from '../../../core/services/busy.service';
import { CartService } from '../../../core/services/cart.service';
import { IsAdminDirective } from '../../../shared/directives/is-admin.directive';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterLinkActive,
    RouterLink,
    MatIcon,
    MatBadge,
    MatDivider,
    NgIf,
    IsAdminDirective,
  ],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss',
})
export class MobileHeaderComponent {
  busyService = inject(BusyService);
  cartService = inject(CartService);
  accountService = inject(AccountService);
  private router = inject(Router);

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      },
    });
  }
}
