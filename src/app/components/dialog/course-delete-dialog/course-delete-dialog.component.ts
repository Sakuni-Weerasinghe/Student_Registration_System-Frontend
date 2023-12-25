import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './course-delete-dialog.component.html',
  styleUrl: './course-delete-dialog.component.css'
})

export class CourseDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CourseDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { courseCode: string }
  ) { }

  deleteCourse(): void {
    this.dialogRef.close('yes');
  }
}
