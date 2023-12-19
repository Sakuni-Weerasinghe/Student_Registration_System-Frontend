import { Component, ViewChild } from '@angular/core';
import { NgForm ,FormsModule} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Course } from '../../Models/Course';

@Component({
  selector: 'app-course-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-registration.component.html',
  styleUrl: './course-registration.component.css'
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
    private courseService: ApiService,
    private toast: NgToastService){

  }

  addCourse() {
    this.courseService.addCourse(this.courseRegisterRequest)
    .subscribe({
      next: (course) => {
        this.courseform.resetForm();
        this.toast.success({detail:"SUCCESS",summary:"Course Registered! ",duration:3000});
      },
      error: (response) => {

      }
    })
  }
}
