import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Student } from '../../Models/Student';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentDeleteDialogComponent } from '../dialog/student-delete-dialog/student-delete-dialog.component';
import { NgToastService, NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, MatDialogModule, NgToastModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css',
  providers: [ApiService, HttpClient]
})
export class StudentsListComponent {
  students: Student[] = [];
  student!: Student;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private toast: NgToastService) { }

  ngOnInit(): void {

    this.apiService.getAllStudents()
      .subscribe({
        next: (response) => {
          //console.log(students);
          this.students = response;
        },
        error: (error) => {
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

  deleteStudent(studentId: number) {
    this.apiService.deleteStudent(studentId)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 3000,
          });
          const newStudentList = this.students.filter(item => item.studentId !== studentId)
          this.students = newStudentList;
        },
        error: (error) => {
          console.log(error.message);
        },
      })
  }

}
