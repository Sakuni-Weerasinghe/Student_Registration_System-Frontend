import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService, NgToastModule } from 'ng-angular-popup';
import { Course } from '../../Models/Course';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgToastModule],
  templateUrl: './course-registration.component.html',
  styleUrl: './course-registration.component.css',
  providers: [HttpClient]
})
export class CourseRegistrationComponent {
  courseRegistrationForm: FormGroup;

  courseRegisterRequest: Course = {
    courseId: 0,
    courseName: " ",
    courseCode: " ",
    credits: 0,
    lecturer: " ",
    registerDate: new Date(),
    selected: false
  };

  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    private fb: FormBuilder
  ) {
    this.courseRegistrationForm = this.fb.group({
      courseName: ['', Validators.required],
      courseCode: ['', Validators.required],
      credits: ['', Validators.required],
      description: ['', Validators.required],
      lecturer: ['', Validators.required]
    })
  }

  courseRegister() {
    if (this.courseRegistrationForm.valid) {
      this.apiService.addCourse(this.courseRegistrationForm.value).subscribe({
        next: (res) => {
          this.courseRegistrationForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: "Course Registered",
            duration: 3000,
          });
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 3000,
          });
        }
      });
    } else {
      this.validateAllFormFields(this.courseRegistrationForm);
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

