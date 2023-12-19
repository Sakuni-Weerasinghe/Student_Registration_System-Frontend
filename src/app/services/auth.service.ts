import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private stateService: StateService
  ) { }

  /**
   * This function use to get token from local storage
   * @returns : token
   */
  getToken() {
    return this.localStorageService.getItem('token');
  }

  /**
   * This function use to get login status of the user
   * @returns : login status
   */
  isLogin() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  login() {
    this.stateService.setLoginStatus(true);
  }

  logout() {
    this.stateService.setLoginStatus(false);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
