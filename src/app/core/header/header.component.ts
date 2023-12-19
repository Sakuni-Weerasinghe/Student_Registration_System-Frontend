import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [StateService, LocalStorageService],
})
export class HeaderComponent implements OnInit {
  @Input() isLogin: boolean = false;
  @Input() activePathName: string = '';

  constructor(
    private localStorageService: LocalStorageService,
    private stateService: StateService,
    private router: Router
  ) { }

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

  /**
   * This function use to handle logout button lick event
   */
  logOutHandler() {
    this.stateService.setLoginStatus(false);
    // localStorage.clear();
  }
}
