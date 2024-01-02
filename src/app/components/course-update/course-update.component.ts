import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgToastService, NgToastModule } from 'ng-angular-popup';
import { RouterModule } from '@angular/router';
import { Course } from '../../Models/Course';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, NgToastModule, CommonModule, RouterModule],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent {
  courseUpdateForm!: FormGroup;

  courseUpdateRequest: Course = {
    courseId: 0,
    courseName: " ",
    courseCode: " ",
    credits: 0,
    lecturer: " ",
    registerDate: new Date(),
    selected: false,
    courseSchedules: []
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('id');
        if (idString) {
          const id = +idString;
          this.apiService.getCourse(id).subscribe({
            next: (response) => {
              this.courseUpdateRequest = response;
              this.initForm();
            },
          });
        }
      },
    });
  }

  initForm() {
    this.courseUpdateForm = this.fb.group({
      courseName: [this.courseUpdateRequest.courseName, Validators.required],
      courseCode: [this.courseUpdateRequest.courseCode, Validators.required],
      registerDate: [this.courseUpdateRequest.registerDate],
      credits: [this.courseUpdateRequest.credits, Validators.required],
      lecturer: [this.courseUpdateRequest.lecturer, Validators.required],
      courseSchedules: [this.courseUpdateRequest.courseSchedules, Validators.required]
    });

    // Dynamically add form controls for each schedule
    this.courseUpdateRequest.courseSchedules.forEach((schedule, index) => {
      this.courseUpdateForm.addControl(`date${index}`, this.fb.control(schedule.date, Validators.required));
      this.courseUpdateForm.addControl(`time${index}`, this.fb.control(schedule.time, Validators.required));
      this.courseUpdateForm.addControl(`venue${index}`, this.fb.control(schedule.venue, Validators.required));
    });

    // Reset form controls to mark them as not dirty
    Object.keys(this.courseUpdateForm.controls).forEach(key => {
      this.courseUpdateForm.get(key)?.markAsPristine;
    });

    // Subscribe to value changes for form validation
    this.courseUpdateForm.valueChanges.subscribe(() => {
      this.validateAllFormFields(this.courseUpdateForm);
    });
  }

  onUpdate() {
    if (this.courseUpdateForm.valid) {
      this.apiService.updateCourses(this.courseUpdateRequest.courseId, this.courseUpdateForm.value).subscribe({
        next: (response) => {
          this.courseUpdateForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 2000,
          });
          this.router.navigate(['course/']);
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
      this.validateAllFormFields(this.courseUpdateForm);
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

  deleteSchedule(courseScheduleId: number) {
    this.apiService.deleteCourseSchedule(courseScheduleId)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 3000,
          });
          const newCourseSchedule = this.courseUpdateRequest.courseSchedules.filter(item => item.courseScheduleId !== courseScheduleId)
          this.courseUpdateRequest.courseSchedules = newCourseSchedule;
        },
        error: (error) => {
          console.log(error.message);
        },
      })
  }
}
