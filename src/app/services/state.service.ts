import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private loginStatusSubject = new BehaviorSubject<boolean>(false);

  loginStatus$ = this.loginStatusSubject.asObservable();

  setLoginStatus(newValue: boolean): void {
    this.loginStatusSubject.next(newValue);
  }
}
