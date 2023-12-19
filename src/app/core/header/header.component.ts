import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginComponent } from '../../components/login/login.component';
import { NavItem } from '../../Models/Navbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;

  navItems: NavItem[] = [];
  private unAuthNavItems: NavItem[] = [
    {
      label: 'Home',
      path: '',
    },
  ];
  private authNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: 'dashboard',
    },
    {
      label: 'Student',
      path: 'student',
    },
    {
      label: 'Courses',
      path: 'course',
    },

  ];

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.stateService.setLoginStatus(true);
    } else {
      this.stateService.setLoginStatus(false);
    }

    // Keep eye on loginStatus changes
    this.stateService.loginStatus$.subscribe((value) => {

      this.isLogin = value as boolean;
      if (value) {
        this.navItems = this.authNavItems;
      } else {
        this.navItems = this.unAuthNavItems;
      }
    });
  }

  /**
   * This function use to handle login button click event
   */
  logInHandler() {
    this.router.navigate(['login']);
  }

  /**
   * This function use to handle logout button click event
   */
  logOutHandler() {
    this.authService.logout();
  }
}
