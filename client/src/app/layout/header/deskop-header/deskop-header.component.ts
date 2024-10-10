import { OverlayModule } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { BusyService } from '../../../core/services/busy.service';
import { CartService } from '../../../core/services/cart.service';
import { IsAdminDirective } from '../../../shared/directives/is-admin.directive';

@Component({
  selector: 'app-deskop-header',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatBadge,
    RouterLink,
    RouterLinkActive,
    MatProgressBar,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem,
    IsAdminDirective,
    NgIf,
    OverlayModule,
  ],
  templateUrl: './deskop-header.component.html',
  styleUrl: './deskop-header.component.scss',
})
export class DeskopHeaderComponent {
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
