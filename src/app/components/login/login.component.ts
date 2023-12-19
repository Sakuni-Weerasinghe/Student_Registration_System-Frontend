import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgToastModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService, HttpClient],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 3000,
          });
          this.stateService.setLoginStatus(true);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something Went Wrong!',
            duration: 3000,
          });
        },
      });
      //send to database
    } else {
      //throw error
      this.validateAllFormFields(this.loginForm);
      alert('Your Form is invalid');
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