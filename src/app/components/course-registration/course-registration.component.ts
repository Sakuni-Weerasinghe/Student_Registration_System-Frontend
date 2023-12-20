import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Course } from '../../Models/Course';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-registration.component.html',
  styleUrl: './course-registration.component.css',
  providers: [HttpClient]
})
export class CourseRegistrationComponent {
  @ViewChild('courseform')
  courseform!: NgForm;

  courseRegisterRequest: Course = {
    courseId: 0,
    courseName: " ",
    courseCode: " ",
    credits: 0,
    description: " ",
    lecturer: " ",
    selected: false
  };

  constructor(
    private apiService: ApiService,
    private toast: NgToastService) {

  }

  addCourse() {
    this.apiService.addCourse(this.courseRegisterRequest)
      .subscribe({
        next: (response) => {
          this.courseform.resetForm();
          this.toast.success({ detail: "SUCCESS", summary: "Course Registered! ", duration: 3000 });
        },
        error: (error) => {

        }
      })
  }
}
