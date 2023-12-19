import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLogin()) {
    inject(Router).navigate(['dashboard']);
    return false;
  }
  return true;
};
