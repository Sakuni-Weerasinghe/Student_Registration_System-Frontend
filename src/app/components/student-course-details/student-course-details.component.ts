import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../Models/Student';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../Models/Course';
import { StudentCourses } from '../../Models/StudentCourse';
import { NgToastService } from 'ng-angular-popup';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-course-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgToastModule],
  templateUrl: './student-course-details.component.html',
  styleUrl: './student-course-details.component.css',
  providers: [ApiService,HttpClient],
})
export class StudentCourseDetailsComponent {
  courses_ = new FormControl('');

  selectedCourses: Course[] = [];
  courses: Course[] = [];

  courseList: Course[] = [];
  initialCourseList: Course[] = [];

  studentDetails: Student = {
    studentId: 0,
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
        }
      },
    });

    this.apiService.getAllCourses().subscribe({
      next: (response) => {
        //console.log(students);
        this.initialCourseList = response;
        this.courseList = [...response];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSelectedCourseList() {
    const studentId = this.studentDetails.studentId;
    const selectedList = this.courseList.filter(item => item.selected).map(item => {
      return { "studentId": studentId, "courseId": item.courseId }
    });

    return selectedList;
  }

  saveCourses() {
    const request = this.getSelectedCourseList();
    this.apiService.addStudentCourses(request)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.toast.success({ detail: "SUCCESS", summary: "Added Courses", duration: 2000 });
          this.router.navigate(['student-enrollment']);
        },
        error: (error) => {

        }
      })
  }

  onCheckboxChange(course: any): void {
    if (course.selected) {
      this.selectedCourses.push(course);
    } else {
      const index = this.selectedCourses.findIndex(
        (selectedCourse) => selectedCourse.courseCode === course.courseCode
      );
      if (index !== -1) {
        this.selectedCourses.splice(index, 1);
      }
    }
  }

}
