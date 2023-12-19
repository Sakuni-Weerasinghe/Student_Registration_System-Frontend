import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { StateService } from './services/state.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    NgToastModule,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [HttpClient,StateService,AuthService]
})
export class AppComponent {
  title = 'Student_Registration_System-Frontend';


  constructor(private stateService: StateService){}

  ngOnInit(): void {
    const tokenString = localStorage.getItem('token');
    const isLogin = tokenString ? true : false;
    this.stateService.setLoginStatus(isLogin);
  }
}
