import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Student } from '../../Models/Student';
import { NgToastService, NgToastModule } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgToastModule, CommonModule, RouterModule],
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  studentRegistrationForm!: FormGroup;

  studentDetails: Student = {
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('id');
        if (idString) {
          const id = +idString;
          this.apiService.getStudent(id).subscribe({
            next: (response) => {
              this.studentDetails = response;

              // Form initialization and patching logic
              this.initForm();
            },
          });
        }
      },
    });
  }

  initForm() {
    this.studentRegistrationForm = this.fb.group({
      studentRegistrationNumber: [this.studentDetails.studentRegistrationNumber],
      firstName: [this.studentDetails.firstName, Validators.required],
      lastName: [this.studentDetails.lastName, Validators.required],
      birthday: [this.studentDetails.birthday, Validators.required],
      gender: [this.studentDetails.gender],
      email: [this.studentDetails.email],
      phone: [this.studentDetails.phone, [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      addressLine1: [this.studentDetails.addressLine1, Validators.required],
      addressLine2: [this.studentDetails.addressLine2, Validators.required],
      addressLine3: [this.studentDetails.addressLine3],
    });

    // Reset form controls to mark them as not dirty
    Object.keys(this.studentRegistrationForm.controls).forEach(key => {
      this.studentRegistrationForm.get(key)?.markAsPristine;
    });

    // Subscribe to value changes for form validation
    this.studentRegistrationForm.valueChanges.subscribe(() => {
      this.validateAllFormFields(this.studentRegistrationForm);
    });
  }

  onUpdate() {
    if (this.studentRegistrationForm.valid) {
      this.apiService.updateStudent(this.studentDetails.studentId, this.studentRegistrationForm.value).subscribe({
        next: (response) => {
          this.studentRegistrationForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 2000,
          });
          this.router.navigate(['student/details/' + this.studentDetails.studentId]);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 2000,
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
      if (control) {
        control.markAsDirty({ onlySelf: true });
      }
    });
  }
}
