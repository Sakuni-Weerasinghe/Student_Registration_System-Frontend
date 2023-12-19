import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';

import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HttpClientModule, NgToastModule, HeaderComponent, FooterComponent],
  providers: [HttpClient, AuthService]
})
export class AppComponent implements OnInit {
  isLogin: boolean = false;
  activePathName: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Subscribe to NavigationEnd events
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Get the current navigation URL
      const currentUrl = event.url;
      this.activePathName = currentUrl;
    });
  }
}