import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../Models/Course';
import { CourseSchedule } from '../../Models/CourseSchedule';
import { ApiService } from '../../services/api.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgToastModule],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.css',
  providers: [HttpClient]
})
export class CourseScheduleComponent {
  courseScheduleForm: FormGroup;

  courses: Course[] = [];

  courseScheduleRequest: CourseSchedule = {
    courseScheduleId: 0,
    courseCode: "",
    date: "",
    time: "",
    venue: ""
  };


  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    private fb: FormBuilder
  ) {
    this.courseScheduleForm = this.fb.group({
      courseCode: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      venue: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.apiService.getAllCourses()
      .subscribe({
        next: (response) => {
          //console.log(students);
          this.courses = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  scheduleRegister() {
    if (this.courseScheduleForm.valid) {
      this.apiService.addCourseSchedule(this.courseScheduleForm.value).subscribe({
        next: (res) => {
          this.courseScheduleForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
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
      this.validateAllFormFields(this.courseScheduleForm);
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
