import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../Models/Course';
import { CourseSchedule } from '../../Models/CourseSchedule';
import { ApiService } from '../../services/api.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-course-schedule',
  standalone: true,
  imports: [FormsModule, CommonModule, NgToastModule],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.css'
})
export class CourseScheduleComponent {
  @ViewChild('coursescheduleform')
  coursescheduleform!: NgForm;

  courses: Course[] = [];

  courseScheduleRequest: CourseSchedule = {
    courseScheduleId: 0,
    courseCode: "",
    date: "",
    time: "",
    venue: ""
  };


  constructor(
    private coursescheduleService: ApiService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.coursescheduleService.getAllCourses()
      .subscribe({
        next: (response) => {
          //console.log(students);
          this.courses = response;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  addCourseSchedule() {
    this.coursescheduleService.addCourseSchedule(this.courseScheduleRequest)
    .subscribe({
      next: (course) => {
        this.coursescheduleform.resetForm();
        this.toast.success({detail:"SUCCESS",summary:"Course Schedule Added! ",duration:3000});
      },
      error: (response) => {

      }
    })
  }

}
