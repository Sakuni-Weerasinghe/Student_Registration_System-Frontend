import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Student } from '../../Models/Student';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../Models/Course';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
  providers: [HttpClient]
})
export class StudentDetailsComponent {
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

  courseDetails : Course = {
    courseId: 0,
    courseName: "",
    courseCode: "",
    credits: 0,
    description: "",
    lecturer: "",
    selected: false
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
        }
      },
    });

  }
}