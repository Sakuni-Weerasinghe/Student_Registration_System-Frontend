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
import { CourseStudentListDialogComponent } from '../dialog/course-student-list-dialog/course-student-list-dialog.component';
import { StudentCourses_ } from '../../Models/StudentCourse';

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
  studentList: StudentCourses_[] = [];

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

  onView(courseId: number) {
    this.apiService.getCourseStudentList(courseId).subscribe(
      (data: StudentCourses_[]) => {
        this.studentList = data;

        const dialogRef = this.dialog.open(CourseStudentListDialogComponent, {
          data: { studentList: this.studentList },
          position: { top: '6%' },
        });
      },
      (error) => {
        console.error('Error fetching student list', error);
      }
    );
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
