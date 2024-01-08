import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgToastModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [HttpClient],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toast: NgToastService,
    private localStorageService: LocalStorageService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  ngOnInit(): void { }


  onLogin() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.localStorageService.setItem("token", res.token)
          this.localStorageService.setItem('userType', res.userType);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 2000,
          });
          this.authService.login();
          // Navigate based on user type
          if (res.userType === 0) {
            this.router.navigate(['admin-dashboard']);
          } else if (res.userType === 1) {
            this.router.navigate(['student-dashboard']);
          }
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 2000,
          });
        },
      });
    } else {
      this.validateAllFormFields(this.loginForm);
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please fill the required fields!',
        duration: 2000,
      });
    }
  }


  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


}