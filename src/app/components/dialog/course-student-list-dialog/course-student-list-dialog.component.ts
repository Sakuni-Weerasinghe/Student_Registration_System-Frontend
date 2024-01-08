import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../Models/Student';
import { StudentCourses_ } from '../../../Models/StudentCourse';

@Component({
  selector: 'app-course-student-list-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    FormsModule],
  templateUrl: './course-student-list-dialog.component.html',
  styleUrl: './course-student-list-dialog.component.css'
})
export class CourseStudentListDialogComponent {

  studentList: StudentCourses_[];
  selectedStudents: Student[] = [];

  constructor(
    public dialogRef: MatDialogRef<CourseStudentListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.studentList = data.studentList;
  }

  unenrolleCourse(): void {
    this.dialogRef.close({ action: 'unenroll', selectedStudents: this.selectedStudents });
  }


  onCheckboxChange(student: any): void {
    if (student.selected) {
      this.selectedStudents.push(student);
    } else {
      const index = this.selectedStudents.findIndex(
        (selectedStudents) => selectedStudents.studentId === student.studentId
      );
      if (index !== -1) {
        this.selectedStudents.splice(index, 1);
      }
    }
  }
}
