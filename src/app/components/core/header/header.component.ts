import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
import { LocalStorageService } from '../../../services/local-storage.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [StateService, LocalStorageService],
})
export class HeaderComponent implements OnInit {
  @Input() isLogin: boolean = false;
  @Input() activePathName: string = '';

  constructor(
    private router: Router,
    private stateService: StateService,
    private localStorageService: LocalStorageService
  ) {}

  loginHandler() {
    if (this.isLogin) {
      console.log('bbbbbbbbbbbbbbbbbbb');
      this.stateService.setLoginStatus(false);
      this.router.navigate(['']);
      localStorage.clear();
    } else {
      console.log('aaaaaaaaaaaaaa');
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    // Check token availability in local storage
    const token = this.localStorageService.getItem('token');
    this.isLogin = token ? true : false;
    // Update login status
    this.stateService.setLoginStatus(this.isLogin);
    // Keep eye on loginStatus changes
    this.stateService.loginStatus$.subscribe((value) => {
      this.isLogin = value;
    });
  }

  logOutHandler() {
    this.stateService.setLoginStatus(false);
    // localStorage.clear();
  }
}
