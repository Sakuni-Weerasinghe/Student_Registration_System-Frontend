import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Student } from '../../Models/Student';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-enrollment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-enrollment.component.html',
  styleUrl: './student-enrollment.component.css',
  providers: [ApiService, HttpClient]
})
export class StudentEnrollmentComponent {
  students: Student[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.apiService.getAllStudents()
      .subscribe({
        next: (response) => {
          this.students = response.sort((a, b) => {
            const registrationNumberA = a.studentRegistrationNumber;
            const registrationNumberB = b.studentRegistrationNumber;

            if (registrationNumberA < registrationNumberB) {
              return -1;
            } else if (registrationNumberA > registrationNumberB) {
              return 1;
            } else {
              return 0; // Registration numbers are equal
            }
          });
        },
        error: (error) => {
        }
      });
  }
}
