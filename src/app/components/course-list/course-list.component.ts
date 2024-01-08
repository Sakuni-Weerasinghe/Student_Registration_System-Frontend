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
          this.courses = response.sort((a, b) => {
            const courseCodeA = a.courseCode;
            const courseCodeB = b.courseCode;

            if (courseCodeA < courseCodeB) {
              return -1;
            } else if (courseCodeA > courseCodeB) {
              return 1;
            } else {
              return 0;
            }
          });
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

        dialogRef.afterClosed().subscribe((result) => {
          if (result && result.action === 'unenroll') {
            const selectedStudents = result.selectedStudents;
            if (selectedStudents.length > 0) {
              selectedStudents.forEach((student: any) => {
                this.unenrollCourse(student.studentId, courseId)
              });
            } else {
              this.toast.error({
                detail: 'ERROR',
                summary: "Please select student wants to unenroll",
                duration: 3000,
              });
            }
          }
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
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 3000,
          });
          const newCourseList = this.courses.filter(item => item.courseId !== courseId)
          this.courses = newCourseList;
        },
        error: (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary: error.error.message,
            duration: 2000
          })
        },
      })
  }

  unenrollCourse(studentId: number, courseId: number) {
    this.apiService.deleteStudentCourses(studentId, courseId)
      .subscribe({
        next: (response) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 2000,
          });
        },
        error: (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary: error.error.message,
            duration: 2000
          })
        },
      })
  }

}
