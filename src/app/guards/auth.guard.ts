import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';


export const authGuard: CanActivateFn = (): boolean => {

  if (inject(AuthService).isLogin()) {
    return true;
  } else {
    inject(NgToastService).error({
      detail: 'ERROR',
      summary: 'Please Login First',
    });
    inject(Router).navigate(['login']);
    return false;
  }
};