import { Component } from '@angular/core';
import { Course } from '../../Models/Course';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentDeleteDialogComponent } from '../dialog/student-delete-dialog/student-delete-dialog.component';
import { NgToastService, NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, MatDialogModule, NgToastModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  providers: [ApiService, HttpClient]
})
export class CourseListComponent {
  courses: Course[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private toast: NgToastService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.apiService.getAllCourses()
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

  onClick(studentRegistrationNumber: string, studentId: number) {
    const dialogRef = this.dialog.open(StudentDeleteDialogComponent, {
      data: { registrationNumber: studentRegistrationNumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.deleteStudent(studentId);
      }
    });
  }

  deleteStudent(courseId: number) {
    this.apiService.deleteCourse(courseId)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 3000,
          });
          const newCourseList = this.courses.filter(item => item.courseId !== courseId)
          this.courses = newCourseList;
        },
        error: (error) => {
          console.log(error.message);
        },
      })
  }
}
