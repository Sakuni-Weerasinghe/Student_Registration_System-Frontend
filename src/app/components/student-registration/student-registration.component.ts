import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../Models/Student';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [CommonModule, NgToastModule, ReactiveFormsModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
  providers: [HttpClient]
})
export class StudentRegistrationComponent {
  studentRegistrationForm: FormGroup;

  studentRegisterRequest: Student = {
    studentId: 0,
    studentRegistrationNumber: ' ',
    firstName: ' ',
    lastName: ' ',
    birthday: new Date(),
    gender: ' ',
    email: ' ',
    phone: ' ',
    addressLine1: ' ',
    addressLine2: ' ',
    addressLine3: ' ',
  };

  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    private fb: FormBuilder
  ) {
    this.studentRegistrationForm = this.fb.group({
      studentRegistrationNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: [new Date(), Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      addressLine3: [''],
    })
  }

  onRegister() {
    if (this.studentRegistrationForm.valid) {
      this.apiService.registerStudent(this.studentRegistrationForm.value).subscribe({
        next: (response) => {
          this.studentRegistrationForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 3000,
          });
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 3000,
          });
        },
      })
    } else {
      this.validateAllFormFields(this.studentRegistrationForm);
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please fill the required fields!',
        duration: 3000,
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
