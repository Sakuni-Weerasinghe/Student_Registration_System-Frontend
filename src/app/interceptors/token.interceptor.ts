import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = inject(AuthService).getToken();
  if(myToken){
    req = req.clone({
      setHeaders : {Authorization : `Bearer${myToken}`}
    })
  }
  return next(req);

};

