import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Student } from '../../Models/Student';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../Models/Course';
import { MatIconModule } from '@angular/material/icon';
import { StudentCourses_ } from '../../Models/StudentCourse';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
  providers: [HttpClient]
})
export class StudentDetailsComponent {
  studentCourses: StudentCourses_[] = [];

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

  courseDetails: Course = {
    courseId: 0,
    courseName: "",
    courseCode: "",
    credits: 0,
    lecturer: "",
    registerDate: new Date(),
    selected: false,
    courseSchedules: []
  }

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toast: NgToastService,
    private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('id');
        if (idString) {
          const id = +idString;
          this.apiService.getStudent(id).subscribe({
            next: (response) => {
              this.studentDetails = response;
            },
          });

          this.apiService.getStudentCourses(id).subscribe({
            next: (response) => {
              this.studentCourses = response;
            },
            error: (error) => {
              console.error('Error fetching student courses', error);
            },
          })
        }
      },
    });

  }

  deleteCourse() {

  }
}