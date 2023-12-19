import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Student } from '../../Models/Student';

@Component({
  selector: 'app-student-enrollment',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './student-enrollment.component.html',
  styleUrl: './student-enrollment.component.css',
  providers: [ApiService]
})
export class StudentEnrollmentComponent {
  students: Student[] = [];

  constructor(private studentEnrollmentService: ApiService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.studentEnrollmentService.getAllStudents()
    .subscribe({
      next: (students) => {
        //console.log(students);
        this.students = students;
      },
      error: (response) => {
        console.log(response);
      }
  });
  }
}
