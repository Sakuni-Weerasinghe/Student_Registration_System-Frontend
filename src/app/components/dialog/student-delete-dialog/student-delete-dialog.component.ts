import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-student-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './student-delete-dialog.component.html',
  styleUrl: './student-delete-dialog.component.css'
})

export class StudentDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { registrationNumber: string }
  ) { }

  deleteStudent(): void {
    this.dialogRef.close('yes');
  }
}
