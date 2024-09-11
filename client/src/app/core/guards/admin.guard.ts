import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { SnackbarService } from '../services/snackbar.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const accounterService = inject(AccountService);
  const router = inject(Router);
  const snackbar = inject(SnackbarService);

  if (accounterService.isAdmin()) {
    return true;
  } else {
    snackbar.error('You cannot access this area');
    router.navigateByUrl('/home');
    return false;
  }
 };
