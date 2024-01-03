import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-student-list-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, CommonModule],
  templateUrl: './course-student-list-dialog.component.html',
  styleUrl: './course-student-list-dialog.component.css'
})
export class CourseStudentListDialogComponent {

  studentList: any[]; // Adjust the type based on your actual data structure

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // Access the student list from the data object
    this.studentList = data.studentList;
  }

}
