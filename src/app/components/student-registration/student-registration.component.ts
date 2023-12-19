import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../Models/Student';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, NgToastModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
})
export class StudentRegistrationComponent {
  @ViewChild('form')
  form!: NgForm;

  studentRegisterRequest: Student = {
    studentId: 0,
    firstName: ' ',
    lastName: ' ',
    birthday: new Date(),
    gender: ' ',
    email: ' ',
    phones: ' ',
    addressLine1: ' ',
    addressLine2: ' ',
    addressLine3: ' ',
  };

  constructor(
    private studentService: ApiService,
    private toast: NgToastService
  ) {}

  registerStudent() {
    this.studentService.registerStudent(this.studentRegisterRequest).subscribe({
      next: (student) => {
        this.form.resetForm();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Student Registered! ',
          duration: 3000,
        });
      },
      error: (response) => {},
    });
  }
}
